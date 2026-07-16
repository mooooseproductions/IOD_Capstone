import { BrewController } from "../controllers/brewController";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, BrewController.addBrew);
router.get("/search", authMiddleware, BrewController.searchBrews);
router.get("/template/:id", authMiddleware, BrewController.getBrewTemplate);
router.get("/:id", authMiddleware, BrewController.getBrewById);
router.put("/:id", authMiddleware, BrewController.updateBrew);

export default router;
