import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ChatsController {
    static async getChats(req: Request, res:Response) {
        try {
            const { id } = req.params;
            const chats = await prisma.chat.findMany({
                where: {
                    club_id: id
                },
                orderBy: {
                    created_at: "desc"
                }
            });
            return res.json({chats});
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Something went wrong.please try again!" });
        }
    }
}

export default ChatsController;