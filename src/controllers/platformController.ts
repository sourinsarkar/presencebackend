import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createPlatform, getPlatorms } from "../services/platformService";

export const addPlatform = asyncHandler(async(req: Request, res: Response) => {
    const { name } = req.body;
    const platform = await createPlatform(name);
    res.status(201).json(platform);
});

export const getAllPlatforms = asyncHandler(async(req: Request, res: Response) => {
    const platforms = await getPlatorms();
    res.status(200).json(platforms);
});