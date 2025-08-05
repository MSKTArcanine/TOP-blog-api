const prisma = require('../../../db/auth/connection');

const getAllPostsByAuthorId = async (id) => await prisma.posts.findMany({
    where:{
        author_id: id,
    }
});

const getPostByIdPROTECTED = async (id) => await prisma.posts.findUnique({
    where:{id}
});

const getCommentsByPostId = async (id) => await prisma.comments.findMany({
    where:{post_id: id}
});

module.exports = {getAllPostsByAuthorId, getCommentsByPostId, getPostByIdPROTECTED};