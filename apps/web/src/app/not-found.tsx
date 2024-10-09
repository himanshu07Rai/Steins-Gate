import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen w-screen grid">
      <h1>404 - Not Found</h1>
      <Link href="/">
        <Button>Back To Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
