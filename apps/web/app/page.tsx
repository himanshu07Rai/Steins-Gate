"use client";
import { useState } from "react";
import { useSocketContext } from "../contexts/SocketContext";
import classes from "./page.module.css";

export default function Page() {
  const { sendMessage, messages } = useSocketContext();
  const [message, setMessage] = useState("");

  return (
    <div>
      <div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          className={classes["chat-input"]}
          placeholder="Message..."
        />
        <button
          onClick={(e) => {
            sendMessage(message)
            setMessage("")
          }}
          className={classes["button"]}
        >
          Send
        </button>
      </div>
      <div>
        {messages.map((e,id) => (
          <li key={id}>{e}</li>
        ))}
      </div>
    </div>
  );
}