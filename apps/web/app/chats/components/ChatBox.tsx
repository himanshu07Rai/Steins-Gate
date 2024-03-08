"use client";
import { useState } from "react";
import { useSocketContext } from "../../../contexts/SocketContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Page() {
  const { sendMessage } = useSocketContext();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("akookie");
    router.push("/auth/login");
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleLogout}
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Logout
      </button>
      <div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message..."
        />
        <button
          onClick={(e) => {
            sendMessage(message);
            setMessage("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
