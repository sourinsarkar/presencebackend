import { Request, Response } from "express"; 
import { asyncHandler } from "../utils/asyncHandler";
import { getAvailablePlatformsByCountry, setPlatformAvailability } from "../services/availabilityService";

export const setAvailability = asyncHandler(async(req: Request, res: Response) => {
    const { countryId, platformId, available } = req.body;
    const availablity = await setPlatformAvailability(countryId, platformId, available);
    res.status(201).json(availablity);
});

export const getAvailablePlatforms = asyncHandler(async(req: Request, res: Response) => {
    const { countryId } = req.query;
    const platforms = await getAvailablePlatformsByCountry(String(countryId));
    res.status(200).json(platforms.map((entry) => entry.platform));
});