const prisma = require('../../../auth/connection');

const getAllCommentByPostId = async (id) => await prisma.comments.findMany({where: {post_id: id}});

module.exports = {getAllCommentByPostId};