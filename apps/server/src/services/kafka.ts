import { Kafka, Producer } from 'kafkajs'
import { MessageType } from './socket';
import prisma from '../config/db.config';

type ChatType = {
  id: string;
  message: string;
  club_id: string;
  username: string;
  created_at: string;
}

const kafka = new Kafka({
    brokers: ['localhost:29092']
})

let producer: null | Producer = null;

export async function createProducer() {
  if (producer) return producer;

  try {
    const _producer = kafka.producer();
    await _producer.connect();
    producer = _producer;
    return _producer;
  } catch (error) {
    console.error("Error creating Kafka producer:", error);
    throw error; // Re-throw to ensure error bubbles up
  }
}

export async function produceMessage(payload: MessageType) {
  try {
    const producer = await createProducer();
    await producer.send({
      messages: [{ value: JSON.stringify(payload) }],
      topic: "chat-messages",
    });
    return true;
  } catch (error) {
    console.error("Error producing Kafka message:", error);
    return false; // Gracefully handle the error
  }
}
  
  export async function startMessageConsumer() {
    console.log("Consumer is running..");
    const consumer = kafka.consumer({ groupId: "default" });
    try{
      await consumer.connect();
      await consumer.subscribe({ topic: "chat-messages", fromBeginning: true });
    
      await consumer.run({
        autoCommit: true,
        eachMessage: async ({ message, pause }) => {
          if (!message.value) return;
          // console.log(`New Message Recv..`);
          try {
            let chatData:ChatType = JSON.parse(message.value.toString());
            // console.log({chatData});
            await prisma.chat.create({
              data: {
                message: chatData.message,
                club_id: chatData.club_id,
                username: chatData.username,
                created_at: chatData.created_at,
              },
            });
          } catch (err) {
            console.log(err,"Something is wrong");
            pause();
            setTimeout(() => {
              consumer.resume([{ topic: "chat-messages" }]);
            }, 60 * 1000);
          }
        },
      });
    }catch(err){
      console.log(err);
    }
  }

export default kafka