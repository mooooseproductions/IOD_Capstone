import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';
import { AuthController } from '../controllers/authController';
import express from 'express';

const router = express.Router();
router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/logout", authMiddleware, AuthController.logout);

export default router;