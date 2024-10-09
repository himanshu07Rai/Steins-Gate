import { Router } from "express";

import AuthController from "../controllers/AuthController";
import ClubController from "../controllers/ClubController";

const router = Router();

router.post("/auth/login", AuthController.login);
router.post("/clubs", ClubController.createClub);
router.get("/clubs_by_user", ClubController.clubsByUser);
router.get("/clubs/:id", ClubController.getClub);
router.put("/clubs/:id", ClubController.updateClub);
router.delete("/clubs/:id", ClubController.deleteClub);

export default router;