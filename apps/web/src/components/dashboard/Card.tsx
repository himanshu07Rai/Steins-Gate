"use client"; // This line makes the component a Client Component

import React from "react";
import Link from "next/link";
import { toast } from "sonner";

const Card = ({
  club,
}: {
  club: {
    id: string;
    user_id: number;
    title: string;
    passcode: string;
    created_at: string;
  };
}) => {
  const handleCopyLink = () => {
    const link = `${window.location.origin}/club/${club.id}`;
    navigator.clipboard.writeText(link).then(() => {
      toast("Link copied to clipboard!"); // Show success toast
    });
  };

  // Format the created_at date
  const formattedDate = new Date(club.created_at).toLocaleDateString();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{club.title}</h2>
      <p className="text-gray-600 mb-1">ID: {club.id}</p>
      <p className="text-gray-600 mb-1">Passcode: {club.passcode}</p>
      <p className="text-gray-400 text-sm">
        Created At :-{new Date(club.created_at).toDateString()}
      </p>

      <div className="mt-4 flex space-x-4">
        <Link href={`/club/${club.id}`} passHref>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300">
            View Club
          </button>
        </Link>

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-300"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
};

export default Card;
