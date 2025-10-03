const {PrismaClient} = require('../../generated/shop');

export const prismaShop = new PrismaClient();

module.exports = prismaShop;