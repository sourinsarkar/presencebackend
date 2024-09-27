import { Router } from "express";
import { addPlatform, getAllPlatforms } from "../controllers/platformController";

export const router = Router();

router.post("/add", addPlatform);
router.get("/", getAllPlatforms);