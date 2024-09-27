import { prisma } from "../prisma/client";

export const createCountry = async(name: string, code: string) => {
    return await prisma.country.create({
        data: {name, code},
    });
};

export const getCountries = async () => {
    return await prisma.country.findMany();
}

export const findCountryByName = async(name: string) => {
    return await prisma.country.findFirst({
        where: {
            name: {
                contains: name,
                mode: 'insensitive',
            },
        },
    });
};