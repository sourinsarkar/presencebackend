import { prisma } from "../prisma/client";

export const setPlatformAvailability = async (countryId: string, platformId: string, available: boolean) => {
    return await prisma.platformAvailability.upsert ({
        where: { 
            countryId_platformId: {countryId, platformId } 
        },
        update: { available },
        create: { countryId, platformId, available },
    });
};

export const getAvailablePlatformsByCountry = async(countryId: string) => {
    return await prisma.platformAvailability.findMany({
        where: { countryId, available: true },
        include: {platform: true},
    });
};