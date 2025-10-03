import express from "express";
import { signup, login, logout, getSession } from "../controllers/authController.js";

const router = express.Router();

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Logout
router.post("/logout", logout);

// Get current user session
router.get("/me", getSession); // <-- use '/me' for clarity
// OR you can keep '/session' as well, just be consistent with frontend

export default router;
