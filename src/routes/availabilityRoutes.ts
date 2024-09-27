import { Router } from "express";
import { getAvailablePlatforms, setAvailability,  } from "../controllers/availabilityController";

export const router = Router();

router.post("/set", setAvailability);
router.get("/available", getAvailablePlatforms)