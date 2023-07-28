const { PrismaClient } = require("@prisma/client");
const Prisma_Client = new PrismaClient();

const prisma = (req, res, next) => {
    req.prisma = Prisma_Client;
    next();
};

module.exports = { prisma, Prisma_Client };