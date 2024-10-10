"use client";
import ClubBase from "@/components/clubs/ClubBase";
import Navbar from "@/components/dashboard/Navbar";
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
  const club: ClubType = await fetchClubDetails(id);
  if (!club) {
    return notFound();
  }

  const members = await fetchClubUsers(id);
  const chats: Array<MessageType> | [] = await fetchChats(params.id);
  console.log({ chats });
  console.log({ members });
  return (
    <div>
      <Navbar name="Hima" />
      <div className="p-8">
        <div className="text-2xl">Club id: {params.id}</div>
        <div className="text-2xl">Title: {club?.title}</div>
        <div className="text-2xl">Passcode: {club?.passcode}</div>
        <div className="text-2xl">Created at: {club?.created_at}</div>
        <ClubBase club={club} oldChats={chats} members={members} />
      </div>
    </div>
  );
};

export default Club;
