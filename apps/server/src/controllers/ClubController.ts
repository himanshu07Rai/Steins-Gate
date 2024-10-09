import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ClubController {
  static async clubsByUser(req: Request, res: Response) {
    try {
      const user = req.user;
      console.log({user});
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
        const group = await prisma.club.findUnique({
          where: {
            id: id,
          },
        });
        return res.json({ club: group });
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
      console.log(req.body);
      console.log(req.user);
      const body = req.body;
      const user = req.user;
      const data = {
        title: body?.title,
        passcode: body?.passcode,
        user_id: user!.id,
      }
      console.log(data);
      await prisma.club.create({
        data
      });

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
}

export default ClubController;