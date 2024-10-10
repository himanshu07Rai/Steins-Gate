"use client";
import ClubFeed from "@/components/clubs/ClubFeed";
import Navbar from "@/components/dashboard/Navbar";
import { fetchClubDetails } from "@/fetch/clubs";
import React from "react";

const Club = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  const data = await fetchClubDetails(id);
  // console.log({ data });
  //   id: 'a5147ecd-ab35-4fb7-ab61-ad45f6843186',
  // web:dev:     user_id: 1,
  // web:dev:     title: 'First',
  // web:dev:     passcode: '1111',
  // web:dev:     created_at: '2024-10-09T19:19:39.164Z'
  return (
    <div>
      <Navbar name="Hima" />
      <div className="p-8">
        <div className="text-2xl">Club id: {params.id}</div>
        <div className="text-2xl">Title: {data?.title}</div>
        <div className="text-2xl">Passcode: {data?.passcode}</div>
        <div className="text-2xl">Created at: {data?.created_at}</div>
        <ClubFeed clubId={id} />
      </div>
    </div>
  );
};

export default Club;
