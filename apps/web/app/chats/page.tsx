import React from "react";
import ChatBox from "./components/ChatBox";
import AllMessages from "./components/AllMessages";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const getAllMessages = async () => {
  const url = `http://localhost:8080/api/messages`;
  const allMessages = await fetch(url);
  const messages = await allMessages.json();
  const _messages = messages.map((e) => JSON.parse(e.text).message);
  return _messages;
};

const page = async () => {
  const messages = await getAllMessages();
  return (
    <div>
      <ChatBox />
      <AllMessages _messages={messages} />
    </div>
  );
};

export default page;
