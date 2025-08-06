const dbAuthor = require('../../../db/api/v1/blog-author/author');

const getAllPosts = async (req, res) => {
    const posts = await dbAuthor.getAllPostsById(req.user.id);
    res.status(200).json({posts:posts});
}

const getAllComments = async (req, res) => {
    const comments = await dbAuthor.getAllCommentsById(req.user.id);
    res.status(200).json({comments:comments});
}

const createPost = async (req, res) => {
    const data = req.body;
    await dbAuthor.createPost(req.user.id, data);
}

const getSinglePost = async (req, res) => {
    const post = await dbAuthor.getSinglePostById(req.user.id, Number(req.params.postid));
    res.status(200).json({post:post});
}

const updatePost = async (req, res) => {
    const data = req.body;
    await dbAuthor.updatePostById(req.user.id, Number(req.params.postid), data);
    res.status(204).json({message: "Updated"});
}

const deletePost = async (req, res) => {
    await dbAuthor.deletePostById(req.user.id, Number(req.params.postid));
    res.status(204).json({message: "Deleted"});
}

const deleteAllPosts = async (req, res) => {
    await dbAuthor.deleteAllPostsFromAuthorId(req.user.id);
    res.status(204).json({message: "Deleted all"});
}

const getAllCommentsFromPost = async (req, res) => {
    const comments = await dbAuthor.getCommentsByPostId(req.user.id, Number(req.params.postid));
    res.status(200).json({comments: comments});
}

const deleteCommentFromPost = async (req, res) => {
    await dbAuthor.deleteCommentByPostIdAndCommentId(req.user.id, Number(req.params.postid), Number(req.params.commentid));
    res.status(204).json({message: "Deleted"});
}

const deleteAllCommentsFromPost = async (req, res) => {
    await dbAuthor.deleteAllCommentsFromPostById(req.user.id, Number(req.params.postid));
    res.status(204).json({message: "Deleted all"});
}

module.exports = {
    createPost,
    getAllPosts,
    getAllComments,
    getSinglePost,
    updatePost,
    deletePost,
    deleteAllPosts,
    getAllCommentsFromPost,
    deleteCommentFromPost,
    deleteAllCommentsFromPost,
}