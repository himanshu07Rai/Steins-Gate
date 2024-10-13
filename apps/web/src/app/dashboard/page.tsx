import Navbar from "@/components/dashboard/Navbar";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import CreateClub from "@/components/clubs/CreateClub";
import { fetchUserClubs } from "@/fetch/clubs";
import ClubList from "@/components/dashboard/ClubList";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }
  const d = await fetchUserClubs(session?.user?.token!);
  return (
    <>
      <Navbar user={session?.user!} image={session?.user?.image ?? undefined} />
      <ClubList clubs={d} />
    </>
  );
};

export default Dashboard;
