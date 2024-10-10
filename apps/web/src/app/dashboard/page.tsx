import Navbar from "@/components/dashboard/Navbar";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import CreateClub from "@/components/clubs/CreateClub";
import { fetchUserClubs } from "@/fetch/clubs";
import Card from "@/components/dashboard/Card";
import ClubList from "@/components/dashboard/ClubList";

const Dashboard = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);
  // console.log({ session });
  const d = await fetchUserClubs(session?.user?.token!);
  // console.log({ d });
  return (
    <>
      <Navbar
        name={session?.user?.name!}
        image={session?.user?.image ?? undefined}
      />
      <CreateClub user={session?.user!} />
      <ClubList clubs={d} />
      Dash
    </>
  );
};

export default Dashboard;
