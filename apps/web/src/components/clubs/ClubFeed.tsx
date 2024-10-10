import { getSocket } from "@/lib/socket.config";
import React, { useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import NewClubMember from "./NewClubMember";

// connect socker io here

const ClubFeed = ({
  club,
  oldMessages,
  members,
}: {
  club: {
    id: string;
    title: string;
    passcode: string;
    created_at: string;
  };
  oldMessages: Array<MessageType> | [];
  members: Array<UserType> | [];
}) => {
  const socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = { room: club.id };
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
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("sending message");
    socket.emit("message", { message: uuidv4() });
  };
  return (
    <div>
      <button onClick={handleSubmit}>Send Message</button>
    </div>
  );
};

export default ClubFeed;
