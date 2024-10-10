"use client";
import React, { useEffect } from "react";
import NewClubMember from "./NewClubMember";
import { ClubType } from "@/lib/types";
import Chats from "./Chats";

// connect socker io here

const ClubBase = ({
  club,
  oldChats,
}: {
  club: ClubType;
  oldChats: Array<MessageType> | [];
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
      {open && (
        <NewClubMember
          open={open}
          setOpen={setOpen}
          club={club}
          setChatUser={setChatUser}
        />
      )}
      {!open && (
        <Chats club={club} oldMessages={oldChats} chatUser={chatUser} />
      )}
    </div>
  );
};

export default ClubBase;
