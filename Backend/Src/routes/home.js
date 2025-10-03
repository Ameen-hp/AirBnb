import express from "express";
import upload from "../midlware/uploads.js";
import { addHome, getHomes, getHomeById, updateHome , deleteHome} from "../controllers/home.js";

const router = express.Router();

// Add Home with image
router.post("/add", upload.single("image"), addHome);

// Get all Homes
router.get("/", getHomes);

// Get home details by ID
router.get("/:homeId", getHomeById);

// Update the home with optional image
router.put("/:id", upload.single("image"), updateHome);

// delete the home by id 
// Delete a home
router.delete("/:id", deleteHome);



export default router;
