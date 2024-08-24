const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const appError = require('../service/appError');
const PostModel = require('../models/postModel');
const UserModel = require('../models/userModel');
const CommentModel = require('../models/commentsModal');

const postControllers = {
  // 取得所有貼文v
  async getPosts(req, res, next) {
    //新的訊息在前面timeSort == 'asc'
    const timeSort = req.query.timeSort == 'asc' ? 'createdAt' : '-createdAt';
    console.log('Sorting order:', timeSort);

    const q =
      req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};
    console.log('Query filter:', q);

    const getAllPosts = await PostModel.find(q)
      .populate({
        path: 'user',
        select: 'name photo ',
      })
      .populate({
        path: 'comments',
        select: 'comment user',
      })
      .sort(timeSort)
      .select('+createdAt');
    console.log('Number of posts retrieved:', getAllPosts.length);

    if (getAllPosts.length > 0) {
      console.log('First post date:', getAllPosts[0].createdAt);
      console.log(
        'Last post date:',
        getAllPosts[getAllPosts.length - 1].createdAt
      );
    }
    res.status(200).json({
      status: 'success',
      results: getAllPosts.length,
      data: {
        posts: getAllPosts,
      },
    });
  },
  //[GET]取得單一貼文
  async getAPost(req, res, next) {
    const postId = req.params.id;
    const post = await PostModel.findById(postId)
      .populate({
        path: 'user',
        select: 'name photo',
      })
      .populate({
        path: 'comments',
        select: 'comment user',
      })
      .select('+createdAt');
    if (!post) {
      return next(appError(404, 'Post not found', next));
    }
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  },
  //新增貼文v
  async createPosts(req, res, next) {
    console.log('Request body:', req.body);
    const { content } = req.body; // 确保解构 req.body 中的 content

    if (!content) {
      return next(appError(400, 'Content is required', next));
    }
    const newPost = await PostModel.create({
      content,
      user: req.user._id, // 将当前用户的 ID 添加到新帖子中
      image: req.file ? req.file.path : null,
    });
    handleSuccess(res, newPost);
  },
  //[POST]新增一則貼文的讚
  async createLike(req, res, next) {
    const postId = req.params.id;
    const userId = req.user._id;
    const post = await PostModel.findById(postId);
    if (!post) {
      return next(appError(404, 'Post not found', next));
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return next(appError(404, 'User not found', next));
    }
    const isLiked = post.likes.includes(userId);
    if (isLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  },
  //[DELETE]取消一則貼文的讚
  async deleteLike(req, res, next) {
    const postId = req.params.id;
    const userId = req.user._id;
    const post = await PostModel.findById(postId);
    if (!post) {
      return next(appError(404, 'Post not found', next));
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return next(appError(404, 'User not found', next));
    }
    const isLiked = post.likes.includes(userId);
    if (isLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    }
    await post.save();
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  },
  //[POST]新增一則貼文的留言
  async replyComment(req, res, next) {
    const user = req.user ? req.user._id : null;
    const post = req.params.id;
    const { comment } = req.body;

    if (!user) {
      return next(appError(401, 'Unauthorized: User not found', next));
    }
    const newComment = await CommentModel.create({
      post,
      user,
      comment,
    });
    res.status(200).json({
      status: 'success',
      data: {
        comment: newComment,
      },
    });
  },
  //[GET]取得個人所有貼文列表
  async getUserAllPosts(req, res, next) {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return next(appError(404, 'User not found', next));
    }
    const posts = await PostModel.find({ user: userId })
      .populate({
        path: 'user',
        select: 'name photo',
      })
      .populate({
        path: 'comments',
        select: 'comment user',
      })
      .select('+createdAt');
    res.status(200).json({
      status: 'success',
      data: {
        posts,
      },
    });
  },
};
module.exports = postControllers;
