"use client";
import { useState } from "react";
import { useSocketContext } from "../../../contexts/SocketContext";

export default function Page() {
  const { sendMessage } = useSocketContext();
  const [message, setMessage] = useState("");

  return (
    <div>
      <div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message..."
        />
        <button
          onClick={(e) => {
            sendMessage(message);
            setMessage("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
