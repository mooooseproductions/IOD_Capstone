import { BrewController } from "../controllers/brewController";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, BrewController.addBrew);

export default router;