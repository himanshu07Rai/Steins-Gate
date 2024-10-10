import { getSocket } from "@/lib/socket.config";
import React, { useEffect, useMemo, useState } from "react";
import { v4 as uuid4 } from "uuid";

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
  const socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = { room: club.id };
    socket.connect();
    return socket;
  }, []);
  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((oldMessages) => [...oldMessages, data]);
    });
    return () => {
      socket.disconnect();
      console.log("disconnected");
    };
  }, []);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<MessageType>>(oldMessages);

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
    setMessage("");
    // setMessages([...messages, payload]);
  };

  return (
    <div className="flex flex-col h-[94vh]  p-4">
      <div className="flex-1 overflow-y-auto flex flex-col-reverse">
        <div />
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-sm rounded-lg p-2 ${
                message.username === chatUser?.username
                  ? "bg-gradient-to-r from-blue-400 to-blue-600  text-white self-end"
                  : "bg-gradient-to-r from-gray-200 to-gray-300 text-black self-start"
              }`}
            >
              {message.message}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-2 flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Chats;
