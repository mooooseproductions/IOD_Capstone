import { Router } from "express";
import { LookupController } from "../controllers/lookupController";

const router = Router();

router.get("/ingredients", LookupController.getIngredients);
router.get("/styles", LookupController.getStyles);

router.post("/ingredients", LookupController.addIngredient);
router.post("/styles", LookupController.addStyle);

export default router;