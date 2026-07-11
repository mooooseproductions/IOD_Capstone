import { Router } from "express";
import express from 'express';
import { UserController } from "../controllers/userController";

const router = Router()

router.put("/update", UserController.updateUser);
router.post("/register", UserController.registerUser);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserDetails);
router.delete("/:id", UserController.removeUser);

export default router;