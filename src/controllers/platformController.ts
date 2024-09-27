import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createPlatform, getPlatorms } from "../services/platformService";

// this adds a new platform to db
export const addPlatform = asyncHandler(async(req: Request, res: Response) => {
    const { name } = req.body;
    const platform = await createPlatform(name);
    res.status(201).json(platform);
});

//to get all the platform names
export const getAllPlatforms = asyncHandler(async(req: Request, res: Response) => {
    const platforms = await getPlatorms();
    res.status(200).json(platforms);
});