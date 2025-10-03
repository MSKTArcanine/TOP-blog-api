import { prismaShop } from "../../../auth/connectionShop"

const getAllArticles = async () => {
    const res = await prismaShop.items.findMany();
    return res;
}

module.exports = {getAllArticles};