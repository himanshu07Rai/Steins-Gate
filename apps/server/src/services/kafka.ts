import { Kafka, Producer } from 'kafkajs'
import pgClient from './db';

const kafka = new Kafka({
    brokers: ['localhost:29092']
})

let producer: null | Producer = null;

export async function createProducer() {
  if (producer) return producer;

  const _producer = kafka.producer();
  await _producer.connect();
  producer = _producer;
  return producer;
}

export async function produceMessage(message: string) {
    const producer = await createProducer();
    await producer.send({
        messages: [{ key: `message-${Date.now()}`, value: message }],
        topic: "chat-messages",
    });
    return true;
}
  
  export async function startMessageConsumer() {
    console.log("Consumer is running..");
    const consumer = kafka.consumer({ groupId: "default" });
    await consumer.connect();
    await consumer.subscribe({ topic: "chat-messages", fromBeginning: true });
  
    await consumer.run({ 
      autoCommit: true,
      eachMessage: async ({ message, pause }) => {
        if (!message.value) return;
        console.log(`New Message Recv..`);
        try {
          await pgClient.query('INSERT INTO message (text) VALUES ($1)', [message.value?.toString()]);
        } catch (err) {
          console.log(err,"Something is wrong");
          pause();
          setTimeout(() => {
            consumer.resume([{ topic: "chat-messages" }]);
          }, 60 * 1000);
        }
      },
    });
  }

export default kafka