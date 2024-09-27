import { Router } from "express";
import { addPlatform, getAllPlatforms } from "../controllers/platformController";

const router = Router();

router.post("/add", addPlatform);
router.get("/", getAllPlatforms);