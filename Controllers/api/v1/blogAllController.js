const blog = require('../../../db/api/v1/blog-all/posts');

const getHomePageJson = async (req, res) => {
    const posts = await blog.getAllPosts();
    res.json(posts);
}

module.exports = {getHomePageJson}