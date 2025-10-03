import { prismaShop } from "../../../auth/connectionShop"

export const getAllArticles = async () => {
    try {
        const res = await prismaShop.items.findMany();
        return res;
    }catch(e){
        throw new Error('Database is fucked up');
    }
}

module.exports = {getAllArticles};