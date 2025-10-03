import express from "express";
import { addFavourite, getFavourites } from "../controllers/home.js";

const router = express.Router();

// Add or remove a home from favourites
router.post("/:id",addFavourite);

// Get all favourite homes
router.get("/",getFavourites);

export default router;
