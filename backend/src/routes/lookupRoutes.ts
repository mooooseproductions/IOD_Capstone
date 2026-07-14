import { Router } from "express";
import { LookupController } from "../controllers/lookupController";

const router = Router();

router.get("/ingedients", LookupController.getIngredients);
router.get("/styles", LookupController.getStyles);

router.post("/ingedients", LookupController.addIngredient);
router.post("/styles", LookupController.addStyle);

export default router;