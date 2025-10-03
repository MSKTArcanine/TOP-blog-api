
const articles = require('../../../../db/api/v1/shop/articles');

const getAllArticles = async (req, res) => {
  const resultat = await articles.getAllArticles();
  res.json(resultat);
};

module.exports = { getAllArticles };