"use client";
import { useState } from "react";
import { useSocketContext } from "../contexts/SocketContext";
import classes from "./page.module.css";
import Link from "next/link";
import variables from "./variables.scss";

export default function Page() {
  const { sendMessage, messages } = useSocketContext();
  const [message, setMessage] = useState("");

  return (
    <div>
      <Link href="/chats">Chats</Link>
    </div>
  );
}
