import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.put("/update", authMiddleware, UserController.updateUser);
router.post("/register", UserController.registerUser);
router.get("/profile", authMiddleware, UserController.getUserProfile);
// router.get("/", UserController.getAllUsers); // descoped admin function
// router.get("/:id", authMiddleware, UserController.getUserDetails);
// router.delete("/:id", UserController.removeUser); // descoped admin function

export default router;