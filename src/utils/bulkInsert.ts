import { prisma } from "../prisma/client";
import fs from "fs";
import path from "path";

// Path to the JSON data file
const dataPath = path.join(__dirname, "../data/data.json");

// Read the data from the JSON file
const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Batch size to avoid connection pool issue
const BATCH_SIZE = 8;

const bulkInsert = async() => {
    try {
        // Insert Countries
        // for (let i = 0; i < jsonData.countries.length; i += BATCH_SIZE) {
        //     const batch = jsonData.countries.slice(i, i + BATCH_SIZE);
        //     await prisma.$transaction (
        //         batch.map((country: any) => 
        //         prisma.country.upsert ({
        //             where: { code: country.code },
        //             update: {},
        //             create: { name: country.name, code: country.code },
        //         }))
        //     )
        // }

        // await Promise.all(jsonData.countries.map(async(country: any) => {
        //     await prisma.country.upsert ({
        //         where: { code: country.code },
        //         update: {},
        //         create: { name: country.name, code: country.code }
        //     });
        // }));
        
        // Insert Platforms
        // for (let i = 0; i < jsonData.platforms.length; i += BATCH_SIZE) {
        //     const batch = jsonData.platforms.slice(i, i + BATCH_SIZE);
        //     await prisma.$transaction (
        //         batch.map((platform: any) =>
        //         prisma.platform.upsert({
        //             where: { name: platform.name },
        //             update: {},
        //             create: { name: platform.name }
        //         })) 
        //     )
        // }

        // await Promise.all(jsonData.platforms.map(async(platform: any) => {
        //     await prisma.platform.upsert ({
        //         where: { name: platform.name },
        //         update: {},
        //         create: { name: platform.name }
        //     });
        // }));

        // Insert Availability
        for (let i = 0; i < jsonData.availability.length; i += BATCH_SIZE) {
            const batch = jsonData.availability.slice(i, i + BATCH_SIZE);
            await prisma.$transaction (
                await Promise.all(batch.map(async(entry: any) => {
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
                        })
                    }
                }))
            )
        }

        // await Promise.all(jsonData.availability.map(async(entry: any) => {
        //     const country = await prisma.country.findUnique({ where: { code: entry.code } });
        //     const platform = await prisma.platform.findUnique({ where: { name: entry.name } });

        //     if(country && platform) {
        //         await prisma.platformAvailability.upsert({
        //             where: { countryId_platformId: { countryId: country.id, platformId: platform.id }, },
        //             update: { available: entry.available },
        //             create: {
        //                 countryId: country.id,
        //                 platformId: platform.id,
        //                 available: entry.available,
        //             },
        //         });
        //     };
        // }));

        console.log("Data Inserted Successfully.");
    } catch(error) {
        console.error("Error inserting data: ", error);
    } finally {
        await prisma.$disconnect();
    }
};

bulkInsert();