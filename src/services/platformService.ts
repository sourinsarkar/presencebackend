import { prisma } from "../prisma/client";

export const createPlatform = async (name: string) => {
    return await prisma.platform.create ({
        data: { name },
    });
};

export const getPlatorms = async() => {
    return await prisma.platform.findMany();
}