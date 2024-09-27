import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createPlatform, getPlatorms } from "../services/platformService";

export const addPlatform = asyncHandler(async(req: Request, res:))