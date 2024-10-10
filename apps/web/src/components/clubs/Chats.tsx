import { getSocket } from "@/lib/socket.config";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { v4 as uuid4 } from "uuid";
import ChatInput from "./ChatInput";

const Chats = ({
  club,
  oldMessages,
  chatUser,
}: {
  club: {
    id: string;
    title: string;
    passcode: string;
    created_at: string;
  };
  oldMessages: Array<MessageType> | [];
  chatUser: UserType | null;
}) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Function to scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = { room: club.id };
    socket.connect();
    return socket;
  }, []);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<MessageType>>(oldMessages);
  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((oldMessages) => [...oldMessages, data]);
    });
    scrollToBottom();
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload: MessageType = {
      id: uuid4(),
      message: message,
      username: chatUser?.username ?? "Unknown",
      created_at: new Date().toISOString(),
      club_id: club.id,
    };
    socket.emit("message", payload);
    //scroll to bottom
    // setMessages([...messages, payload]);
    scrollToBottom();
    setMessage("");
  };

  return (
    <div className="flex flex-col h-[94vh] p-4">
      <div className="flex-1 overflow-y-auto flex flex-col-reverse">
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-sm rounded-lg p-2 ${
                message.username === chatUser?.username
                  ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white self-end"
                  : "bg-gradient-to-r from-gray-200 to-gray-300 text-black self-start"
              }`}
            >
              <p>{message.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky input form */}
      <ChatInput
        message={message}
        setMessage={setMessage}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Chats;
