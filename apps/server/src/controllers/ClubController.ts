import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ClubController {
  static async clubsByUser(req: Request, res: Response) {
    try {
      const user = req.user;
      // console.log({user});
      const groups = await prisma.club.findMany({
        where: {
          user_id: user!.id
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return res.json({ clubs: groups });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }

  static async getClub(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (id) {
        const club = await prisma.club.findUnique({
          where: {
            id: id,
          },
        });
        // club members
        const clubMembers = await prisma.clubMember.findMany({
          where: {
            club_id: id
          }
        });
        return res.json({ club:{
          ...club,
          members: clubMembers
        } });
      }

      return res.status(404).json({ message: "No groups found" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }

  static async createClub(req: Request, res: Response) {
    try {
      const body = req.body;
      const user = req.user;
      const data = {
        title: body?.title,
        passcode: body?.passcode,
        user_id: user!.id,
      }
      const createdClub = await prisma.club.create({
        data
      });

      // console.log({createdClub});

      // await prisma.clubMember.create({
      //   data: {
      //     username: user!.username,
      //     club_id: createdClub.id
      //   }
      // });


      return res.json({ message: "Chat Group created successfully!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something weddnt wrong.please try again!" });
    }
  }

  static async updateClub(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;
      if (id) {
        await prisma.club.update({
          data: body,
          where: {
            id: id,
          },
        });
        return res.json({ message: "Group updated successfully!" });
      }

      return res.status(404).json({ message: "No groups found" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }

  static async deleteClub(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.club.delete({
        where: {
          id: id,
        },
      });
      return res.json({ message: "Chat Deleted successfully!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }

  static async joinClub(req: Request, res: Response) {
    try {
      const {
        club_id,
        username
      } = req.body;

      const club = await prisma.club.findUnique({
        where: {
          id: club_id
        }
      });
      if(!club) {
        return res.status(404).json({ message: "Chat Group not found!" });
      }
      const member = await prisma.clubMember.create({
        data: {
          username,
          club_id
        }
      });
      return res.json({ data: member });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }

  // static async leaveClub(req: Request, res: Response) {
  //   try {
  //     const { id } = req.params;
  //     const user = req.user;
  //     await prisma.clubMember.deleteMany({
  //       where: {
  //         user_id: user!.id,
  //         club_id: id
  //       }
  //     });
  //     return res.json({ message: "Chat Group left successfully!" });
  //   } catch (error) {
  //     return res
  //       .status(500)
  //       .json({ message: "Something went wrong.please try again!" });
  //   }
  // }

  static async getClubMembers(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (id) {
        const clubMembers = await prisma.clubMember.findMany({
          where: {
            club_id: id
          }
        });
        return res.json({ members: clubMembers });
      }

      return res.status(404).json({ message: "No groups found" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }
}

export default ClubController;