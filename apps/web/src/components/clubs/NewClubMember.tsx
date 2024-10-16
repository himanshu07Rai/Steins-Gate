import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import axios from "axios";
import { CLUB_MEMBERS } from "@/lib/apiAuthRoutes";
import { useParams } from "next/navigation";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { ClubType } from "@/lib/types";
import { clearCache } from "@/actions/clearCache";

const NewClubMember = ({
  open,
  setOpen,
  club,
  setChatUser,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  club: ClubType;
  setChatUser: Dispatch<SetStateAction<any>>;
}) => {
  const params = useParams();
  const [state, setState] = useState({
    name: "",
    passcode: "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const localData = localStorage.getItem(params["id"] as string);
    if (!localData) {
      try {
        const { data } = await axios.post(CLUB_MEMBERS, {
          username: state.name,
          club_id: params["id"] as string,
        });
        localStorage.setItem(
          params["id"] as string,
          JSON.stringify(data?.data)
        );
        setChatUser(data?.data);
      } catch (error) {
        toast.error("Something went wrong.please try again!");
      }
    }
    if (club.passcode != state.passcode) {
      toast.error("Please enter correct passcode!");
    } else {
      setOpen(false);
    }
    clearCache("members");
  };
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome</DialogTitle>
          <DialogDescription>
            Please enter your name and passcode to join the club.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <Input
              placeholder="Enter your name"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </div>
          <div className="mt-2">
            <Input
              placeholder="Enter your passcode"
              value={state.passcode}
              onChange={(e) => setState({ ...state, passcode: e.target.value })}
            />
          </div>
          <div className="mt-2">
            <Button className="w-full">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewClubMember;
