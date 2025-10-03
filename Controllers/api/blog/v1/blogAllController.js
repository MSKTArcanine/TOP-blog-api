const posts = require('../../../../db/api/v1/blog-all/posts');
const comments = require('../../../../db/api/v1/blog-all/comments');

const getAllPosts = async (req, res) => {
    const result = await posts.getAllPosts();
    if(req.user?.username)
        res.json({posts: result, username: req.user?.username || null});
    result.map(r => {r.author = null; return r})
    res.json({posts: result, username: req.user?.username || null});

}

const getPostById = async (req, res) => {
    const id = Number(req.params.id);
    console.log(id)
    const result = await posts.getPostById(id);
    if(req.user?.username)
        res.json({post: result, username: req.user?.username});
    result.author_id = null
    res.json({post: result, username: req.user?.username});
}

const getAllCommentsByPostId = async (req, res) => {
    const id = Number(req.params.id);
    const comms = await comments.getAllCommentByPostId(id);
    console.log(comms)
    if(req.user?.username)
        res.json({comments: comms, username: req.user?.username});
    comms.map(c => {c.comment_author_id = null; return c})
    res.json({comments: comms, username: req.user?.username});
}

module.exports = {getAllPosts, getPostById, getAllCommentsByPostId}