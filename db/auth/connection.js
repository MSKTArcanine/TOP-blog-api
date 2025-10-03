const {PrismaClient} = require('../../generated/blog');

const prisma = new PrismaClient();

module.exports = prisma;