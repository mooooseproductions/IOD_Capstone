import { BrewController } from "../controllers/brewController";
import { Router } from "express";

const router = Router();

router.post("/", BrewController.addBrew);

export default router;