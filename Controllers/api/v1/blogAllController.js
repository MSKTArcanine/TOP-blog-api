const posts = require('../../../db/api/v1/blog-all/posts');
const comments = require('../../../db/api/v1/blog-all/comments');

const getAllPosts = async (req, res) => {
    const result = await posts.getAllPosts();
    res.json({posts: result});
}

const getPostById = async (req, res) => {
    const id = Number(req.params.id);
    const result = await posts.getPostById(id);
    res.json({post: result});
}

const getAllCommentsByPostId = async (req, res) => {
    const id = Number(req.params.id);
    const comms = await comments.getAllCommentByPostId(id);
    res.json({comments: comms});
}

module.exports = {getAllPosts, getPostById, getAllCommentsByPostId}