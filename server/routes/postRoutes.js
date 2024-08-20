const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/postControllers');
const handleErrorAsync = require('../service/handleErrorAsync');
const { isAuth } = require('../service/auth');
//app.use('/api/posts', postRoutes);
//[GET]取得所有貼文
router.get('/', isAuth, handleErrorAsync(postControllers.getPosts));
//[GET]取得單一貼文
router.get('/{postID}', isAuth, handleErrorAsync(postControllers.getAPost));
//[POST]用戶登入後新增貼文
router.post('/', isAuth, handleErrorAsync(postControllers.createPosts));
// [POST]新增一則貼文的讚
router.post(
  '/{postID}/like',
  isAuth,
  handleErrorAsync(postControllers.createLike)
);
//[DELETE]取消一則貼文的讚
router.delete(
  '/{postID}/unlike',
  isAuth,
  handleErrorAsync(postControllers.deleteLike)
);
//[POST]新增一則貼文的留言
router.post(
  '/:id/comment',
  isAuth,
  handleErrorAsync(postControllers.replyComment)
);
//[GET]取得個人所有貼文列表
router.get(
  '/user/:id',
  isAuth,
  handleErrorAsync(postControllers.getUserAllPosts)
);
module.exports = router;
