import Link from "next/link";
import React from "react";
import { ClubMembers } from "./ClubMembers";

const Navbar = ({
  clubName,
  members,
}: {
  clubName: string;
  members: UserType[];
}) => {
  return (
    <nav className="p-6 flex justify-between items-center bg-white shadow-sm sticky top-0 z-50">
      <Link href="/">
        <h1 className="text-xl md:text-2xl font-extrabold">Steins;Gate</h1>
      </Link>
      <h1 className="text-xl md:text-2xl font-extrabold">{clubName}</h1>
      <ClubMembers members={members} />
    </nav>
  );
};

export default Navbar;
