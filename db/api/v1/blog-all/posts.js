const prisma = require('../../../auth/connection');

const getAllPosts = async () => await prisma.posts.findMany({
    where:{
        is_published: true,
    },
    select:{
        id:true,
        title: true,
        desc: true,
        content: true,
        author: {
            select:{
                username: true,
            }
        },
        is_published: true,
        createdAt: true
    },
    where:{
        is_published:true,
    }
});

const addCommentOnPostId = async (id, comment) => {
    try {
        await prisma.comments.create({
            data:{
                content: comment.content,
                comment_author_id: comment.author_id,
                post_id: id,
            }
        })
    }catch(err){
        console.error(err);
    }
}

const getPostById = async (id) => await prisma.posts.findUnique({where:{id}})

module.exports = {getAllPosts, addCommentOnPostId, getPostById};