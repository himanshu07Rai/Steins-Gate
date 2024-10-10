import { getSocket } from "@/lib/socket.config";
import React, { useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import NewClubMember from "./NewClubMember";
import { ClubType } from "@/lib/types";
import ClubFeed from "./ClubFeed";
import Chats from "./Chats";

// connect socker io here

const ClubBase = ({
  club,
  oldChats,
  members,
}: {
  club: ClubType;
  oldChats: Array<MessageType> | [];
  members: Array<UserType>;
}) => {
  const [chatUser, setChatUser] = React.useState(null);
  const [open, setOpen] = React.useState(true);
  useEffect(() => {
    const data = localStorage.getItem(club.id);
    if (data) {
      setOpen(false);
      const userData = JSON.parse(data);
      setChatUser(userData);
    }
  }, [club.id]);
  return (
    <div>
      {/* {open && <NewClubMember open={open} setOpen={setOpen} club={club} />} */}
      <NewClubMember open={open} setOpen={setOpen} club={club} />
      <Chats club={club} oldMessages={oldChats} chatUser={chatUser} />
    </div>
  );
};

export default ClubBase;
