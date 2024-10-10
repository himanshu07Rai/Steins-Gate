// "use client";
import { getSocket } from "@/lib/socket.config";
import React, { useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

// connect socker io here

const ClubFeed = () => {
  const socket = useMemo(() => {
    const socket = getSocket();
    socket.connect();
    return socket;
  }, []);
  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
    });
    return () => {
      socket.disconnect();
      console.log("disconnected");
    };
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("sending message");
    socket.emit("message", { message: uuidv4() });
  };
  return (
    <div>
      ClubFeed
      <button onClick={handleSubmit}>Send Message</button>
    </div>
  );
};

export default ClubFeed;
