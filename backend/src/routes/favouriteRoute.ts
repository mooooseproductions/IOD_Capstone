import { Router } from "express";
import { FavouriteController } from "../controllers/favouriteController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, FavouriteController.getFavourites);
router.post("/:brewId", authMiddleware, FavouriteController.addFavourite);
router.delete("/:brewId", authMiddleware, FavouriteController.removeFavourite);

export default router;
