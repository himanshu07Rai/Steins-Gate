import { CHATS, CLUB_MEMBERS, CLUBS, CLUBS_BY_USER, } from "@/lib/apiAuthRoutes";

export async function fetchUserClubs(token: string) {
  const res = await fetch(CLUBS_BY_USER, {
    headers: {
      authorization: token,
    },
    next: {
      revalidate: 60 * 60,
      tags: ["dashboard"],
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.clubs) {
    return response?.clubs;
  }
  return [];
}

export async function fetchClubDetails(id: string) {
  const res = await fetch(`${CLUBS}/${id}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.club) {
    return response?.club;
  }
  return null;
}

export async function fetchClubUsers(id: string) {
  const res = await fetch(`${CLUB_MEMBERS}/${id}`, {
    cache: "no-cache",
    next: {
      tags: ["members"],
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.members) {
    return response?.members;
  }
  return [];
}

export async function fetchChats(id: string) {
  const res = await fetch(`${CHATS}/${id}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.chats) {
    return response?.chats;
  }
  return [];
}