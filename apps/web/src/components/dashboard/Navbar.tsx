import React from "react";
import Link from "next/link";
import ProfileMenu from "../auth/ProfileMenu";
export default async function Navbar({
  image,
  name,
}: {
  image?: string;
  name: string;
}) {
  return (
    <nav className="p-6 flex justify-between items-center bg-white shadow-sm sticky top-0 z-50">
      <Link href="/">
        <h1 className="text-xl md:text-2xl font-extrabold">Steins;Gate</h1>
      </Link>
      <div className="flex items-center space-x-2 md:space-x-6 text-gray-700">
        <ProfileMenu name={name} image={image} />
      </div>
    </nav>
  );
}
