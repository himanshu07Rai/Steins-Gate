import Navbar from "@/components/dashboard/Navbar";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const Dashboard = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <>
      <Navbar
        name={session?.user?.name!}
        image={session?.user?.image ?? undefined}
      />
      Dash
    </>
  );
};

export default Dashboard;
