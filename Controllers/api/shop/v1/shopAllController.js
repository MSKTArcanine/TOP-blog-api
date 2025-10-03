const articles = require('../../../../db/api/v1/shop/articles');

export const getAllArticles = async (req, res) => {
    const res = await articles.getAllArticles();
    res.json(res);
}

module.exports = {getAllArticles}