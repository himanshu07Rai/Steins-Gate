"use client";
import React from "react";
import { useSocketContext } from "../../../contexts/SocketContext";

const AllMessages = ({ _messages }: { _messages: string[] }) => {
  console.log(_messages);

  const { messages } = useSocketContext();
  return (
    <div>
      {_messages.map((e, id) => (
        <li key={id}>{e}</li>
      ))}
      {messages.map((e, id) => (
        <li key={id}>{e}</li>
      ))}
    </div>
  );
};

export default AllMessages;
