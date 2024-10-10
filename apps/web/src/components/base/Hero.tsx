import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center pt-10 bg-gradient-to-b from-gray-50 to-white">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        Create your own clubs and share with friends
      </h1>
      <div className="mt-12 w-full max-w-5xl flex justify-center">
        <img
          src="/images/conversations.jpg"
          alt="Illustration"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
