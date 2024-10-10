import { Router } from "express";

import AuthController from "../controllers/AuthController";
import ClubController from "../controllers/ClubController";
import checkAuth from "../middlewares/checkAuth";
import ChatsController from "../controllers/ChatsController";

const router = Router();

router.post("/auth/login", AuthController.login);
router.post("/clubs",checkAuth, ClubController.createClub);
router.get("/clubs_by_user",checkAuth, ClubController.clubsByUser);
router.get("/clubs/:id", ClubController.getClub);
router.put("/clubs/:id",checkAuth, ClubController.updateClub);
router.delete("/clubs/:id",checkAuth, ClubController.deleteClub);
router.get("/members/:id", ClubController.getClubMembers);
router.post("/members", ClubController.joinClub);
router.get("/chats/:id", ChatsController.getChats);

export default router;