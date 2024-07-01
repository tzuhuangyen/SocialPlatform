const express = require('express');
const router = express.Router();
const PostModel = require('../models/postModel');

router.get('/', async (req, res, next) => {
  const AllPosts = await PostModel.find();
  res.status(200).json({
    AllPosts,
  });
});

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const newPost = await PostModel.create(req.body);
    res.status(200).json({
      message: 'create post success',
      posts: newPost,
    });
  } catch (error) {
    res.status(400).json({
      message: 'create post fail',
    });
  }
});

module.exports = router;
