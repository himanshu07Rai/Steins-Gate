"use client";
import React from "react";
import Link from "next/link";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import LoginModal from "../auth/LoginModal";
import { Button } from "../ui/button";
export default function Navbar({ user }: { user: CustomUser | null }) {
  // console.log("Navbar", user);
  return (
    <nav className="p-6 flex justify-between items-center bg-white shadow-sm sticky top-0 z-50">
      <Link href="/">
        <h1 className="text-xl md:text-2xl font-extrabold">Steins;Gate</h1>
      </Link>
      <div className="flex items-center space-x-2 md:space-x-6 text-gray-700">
        {!user ? (
          <LoginModal />
        ) : (
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
