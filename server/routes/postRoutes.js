const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/postControllers');
const handleErrorAsync = require('../service/handleErrorAsync');
const { isAuth } = require('../service/auth');
//app.use('/api/posts', postRoutes);
router.get('/', handleErrorAsync(postControllers.getPosts));
//登入用戶新增貼文
router.post('/', isAuth, handleErrorAsync(postControllers.createPosts));
//用戶回覆貼文的留言
router.post(
  '/:id/comment',
  isAuth,
  handleErrorAsync(postControllers.replyComment)
);
module.exports = router;
