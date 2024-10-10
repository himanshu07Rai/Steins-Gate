"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@react-hook/media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ClubMembers({ members }: { members: UserType[] }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Members</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Members List</DialogTitle>
            <DialogDescription>
              These are the members of the club.
            </DialogDescription>
          </DialogHeader>
          <MembersList members={members} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Members</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Members List</DrawerTitle>
          <DrawerDescription>
            These are the members of the club.
          </DrawerDescription>
        </DrawerHeader>
        <MembersList className="px-4" members={members} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function MembersList({
  className,
  members,
}: {
  className?: string;
  members: UserType[];
}) {
  return (
    <div className={cn("grid items-start gap-4", className)}>
      {members.map((member) => (
        <div key={member.id} className="grid gap-2">
          <Label>{member.username}</Label>
          <Label>
            {`${new Date(member.created_at).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              weekday: "short",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}`}
          </Label>
        </div>
      ))}
    </div>
  );
}
