// console.log(Array.from(countryCodeSet).join(", "));
// Array.from(countryCodeSet).forEach(code => console.log(code))
import fs from "fs";
import path from "path";

// Path to the JSON file
const dataPath = path.join(__dirname, "../data/data.json");

// Read the JSON file
const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Create a set of valid country codes from the countries array
const countryCodeSet = new Set(jsonData.countries.map((country: any) => country.code));

const validateCountryCodes = () => {
    for (let i = 0; i < jsonData.availability.length; i++) {
        const country = jsonData.availability[i];

        if (!country || !country.countryCode) {
            console.error(`Error: Availability entry at index ${i} does not contain a valid country or country code.`);
            console.error("Country object:", JSON.stringify(country, null, 2));
            throw new Error(`Missing or invalid country code at index ${i}`);
        }

        // Check if the countryCode exists in the countryCodeSet
        if (!countryCodeSet.has(country.countryCode)) {
            console.error(`Mismatched Country Code: ${country.countryCode} at index ${i}`);
            console.error(`Country details:`, JSON.stringify(country, null, 2));
            throw new Error(`Error: Country Code ${country.countryCode} in availability entry at index ${i} does not match any code in the countries array.`);
        }
    }
    console.log("All country codes in availability match the countries array.");
}

validateCountryCodes();
