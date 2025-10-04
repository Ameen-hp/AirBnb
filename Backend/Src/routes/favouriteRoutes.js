import express from "express";
import { toggleFavourite, getUserFavourites } from "../controllers/home.js";

const router = express.Router();

// Add or remove a home from favourites
router.post("/:id",toggleFavourite);

// Get all favourite homes
router.get("/",getUserFavourites);

export default router;
