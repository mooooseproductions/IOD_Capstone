import { Router } from "express";
import express from 'express';
import { UserController } from "../controllers/userController";

const router = Router()

router.put("/update", UserController.updateUser);
router.post("/register", UserController.registerUser);


export default router;