const prisma = require('../../../auth/connection');

const getAllPosts = async () => await prisma.posts.findMany({
    select:{
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

module.exports = {getAllPosts, addCommentOnPostId};