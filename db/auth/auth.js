const prisma = require('./connection');

const createUser = async (username, hashedPassword, is_author = false) => {
    try {
        await prisma.user.create({
            data:{
                username,
                hashedPassword,
                is_author,
            }
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = {createUser}