const prisma = require('../../../auth/connection');

const getAllPostsById = async (author_id) => await prisma.posts.findMany({
    where:{
        author_id: author_id,
    }
});

const getAllCommentsById = async (author_id) => await prisma.comments.findMany({
    where:{
        post:{
            author_id:author_id,
        }
    }
});

// POSTS

const getSinglePostById = async (author_id, postid) => await prisma.posts.findFirst({
    where:{
        author_id:author_id,
        id:postid,
    }
});

const updatePostById = async (author_id, postid, data) => {
    const editedPost = {};
    if(data?.title !== undefined) editedPost.title = data.title;
    if(data?.desc !== undefined) editedPost.desc = data.desc;
    if(data?.content !== undefined) editedPost.content = data.content;
    if(data?.is_published !== undefined) editedPost.is_published = data.is_published;
    await prisma.posts.update({
    where:{
        id:postid,
        author_id:author_id,
    },
    data:{
        ...editedPost,
    }
})};

const deletePostById = async (author_id, postid) => await prisma.posts.delete({
    where:{
        id:postid,
        author_id:author_id,
    }
});

const deleteAllPostsFromAuthorId = async (author_id) => await prisma.posts.deleteMany({
    where:{
        author_id,
    }
});

// COMMENTS

const getCommentsByPostId = async (author_id, postid) => await prisma.comments.findMany({
    where:{
        post_id:postid,
        post:{
            author_id: author_id,
        }
    }
});

const deleteCommentByPostIdAndCommentId = async (author_id, postid, commentid) => await prisma.comments.delete({
    where:{
        id:commentid,
        post_id:postid,
        post:{
            author_id:author_id,
        }
    }
});

const deleteAllCommentsFromPostById = async (author_id, postid) => await prisma.comments.deleteMany({
    where:{
        post_id: postid,
        post:{
            author_id,
        }
    }
})

module.exports = {
    getCommentsByPostId,
    getAllPostsById,
    getAllCommentsById,
    getSinglePostById,
    updatePostById,
    deletePostById,
    deleteCommentByPostIdAndCommentId,
    deleteAllCommentsFromPostById,
    deleteAllPostsFromAuthorId,
};