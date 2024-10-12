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
