const prisma = require('./connection');
const bcrypt = require('bcryptjs');

const createUser = async (username, password, is_author = false) => {
    const hashed_password = await bcrypt.hash(password, 10);
    try {
        await prisma.users.create({
            data:{
                username,
                hashed_password,
                is_author,
            }
        })
    } catch (error) {
        throw error;   
    }
}

const getUserByUsername = async (username) => {
    try {
        await prisma.users.findUnique({
            where:{username}
        })
    }catch(error){
        console.error(error);
    }
}

const insertRefreshToken = async (token, user_id) => {
    const hashed_token = await bcrypt.hash(token, 10);
    await prisma.refreshTokens.create({
        data:{
            hashed_token,
            user_id,
        }
    })
}

const getRefreshToken = async (user_id) => {   
        const hashed_token = await prisma.refreshTokens.findUnique({
            where:{
                user_id
            },
            select:{
                hashed_token:true,
            }
        });
}
module.exports = {createUser, getUserByUsername, insertRefreshToken, getRefreshToken}