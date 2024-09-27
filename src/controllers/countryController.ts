import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createCountry, getCountries, findCountryByName } from "../services/countryService";

// this adds a new country to db
export const addCountry = asyncHandler(async(req: Request, res: Response) => {
    const { name, code } = req.body;
    const country = await createCountry(name, code);
    res.status(201).json(country);
});

// to get all the country names in the suggestion for the search bar
export const getAllCountries = asyncHandler(async(req: Request, res: Response) => {
    const countries = await getCountries();
    res.status(200).json(countries)
})

// searching if the country is valid and available in db
export const searchCountry = asyncHandler(async(req: Request, res: Response) => {
    const { name } = req.query;
    const country = await findCountryByName(String(name));
    res.status(200).json(country);
});