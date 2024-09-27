import { Router } from "express";
import { addCountry, getAllCountries, searchCountry } from "../controllers/countryController";

export const router = Router();

router.post("/add", addCountry);
router.get("/", getAllCountries);
router.get("/search", searchCountry);