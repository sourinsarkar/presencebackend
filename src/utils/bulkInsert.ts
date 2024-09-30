import { prisma } from "../prisma/client";
import fs from "fs";
import path from "path";

// Path to the JSON data file
const dataPath = path.join(__dirname, "data.json");

// Read the data from the JSON file
const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const bulkInsert = async() => {
    try {
        // Insert Countries
        await Promise.all(jsonData.countries.map(async(country: any) => {
            await prisma.country.upsert ({
                where: { code: country.code },
                update: {},
                create: { name: country.name, code: country.code }
            });
        }));
        
        // Insert Platforms
        await Promise.all(jsonData.platforms.map(async(platform: any) => {
            await prisma.platform.upsert ({
                where: { name: platform.name },
                update: {},
                create: { name: platform.name }
            });
        }));

        // Insert Availability
        await Promise.all(jsonData.availability.map(async(entry: any) => {
            const country = await prisma.country.findUnique({ where: { code: entry.code } });
            const platform = await prisma.platform.findUnique({ where: { name: entry.name } });

            if(country && platform) {
                await prisma.platformAvailability.upsert({
                    where: { countryId_platformId: { countryId: country.id, platformId: platform.id }, },
                    update: { available: entry.available },
                    create: {
                        countryId: country.id,
                        platformId: platform.id,
                        available: entry.available,
                    },
                });
            };
        }));

        console.log("Data Inserted Successfully.");
    } catch(error) {
        console.error("Error inserting data: ", error);
    } finally {
        await prisma.$disconnect();
    }
};

bulkInsert();