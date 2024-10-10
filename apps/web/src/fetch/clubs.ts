import { CLUBS, CLUBS_BY_USER, } from "@/lib/apiAuthRoutes";

export async function fetchUserClubs(token: string) {
    // console.log({ hehe:token });
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
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  // console.log({ response });
  if (response?.clubs) {
    return response?.clubs;
  }
  return [];
}

export async function fetchClubDetails(id: string) {
  const res = await fetch(`${CLUBS}/${id}`, {
    cache: "no-cache",
  });

  // console.log({ fdsfsdfs:res });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.club) {
    return response?.club;
  }
  return null;
}

// export async function fetchChatGroupUsers(id: string) {
//   const res = await fetch(`${CHAT_GROUP_USERS}?group_id=${id}`, {
//     cache: "no-cache",
//   });

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }
//   const response = await res.json();
//   if (response?.data) {
//     return response?.data;
//   }
//   return [];
// }