const {PrismaClient} = require('../../generated/shop');

const prismaShop = new PrismaClient();

module.exports = prismaShop;