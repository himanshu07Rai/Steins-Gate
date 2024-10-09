import Navbar from "@/components/base/Navbar";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";
import HeroSection from "@/components/base/Hero";

export default async function Home() {
  const session: CustomSession | null = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <Navbar user={session?.user ?? null} />
      <HeroSection />
    </div>
  );
}
