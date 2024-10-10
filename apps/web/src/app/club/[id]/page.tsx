import ClubBase from "@/components/clubs/ClubBase";
import Navbar from "@/components/clubs/Navbar";
import { fetchChats, fetchClubDetails, fetchClubUsers } from "@/fetch/clubs";
import { ClubType } from "@/lib/types";
import { notFound } from "next/navigation";
import React from "react";

const Club = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  if (id.length !== 36) {
    return notFound();
  }
  let club: ClubType;
  try {
    club = await fetchClubDetails(id);
  } catch (error) {
    return notFound();
  }
  if (!club) {
    return notFound();
  }

  const members = await fetchClubUsers(id);
  const chats: Array<MessageType> | [] = await fetchChats(params.id);
  return (
    <div>
      <Navbar clubName={club.title} members={members} />
      <ClubBase club={club} oldChats={chats} />
    </div>
  );
};

export default Club;
