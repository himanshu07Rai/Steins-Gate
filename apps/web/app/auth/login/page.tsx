import { redirect } from "next/navigation";
import React from "react";
import getAuthSession from "../../../utils/getAuthSession";
import Login from "./components/Login";

const page = async () => {
  const session = getAuthSession();
  if (session) {
    redirect("/chats");
  }
  return (
    <div>
      <Login />
    </div>
  );
};

export default page;
