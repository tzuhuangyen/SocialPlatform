const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/postControllers');

router.get('/', async (req, res, next) => {
  postControllers.getPosts(req, res);
});

router.post('/', async (req, res, next) =>
  postControllers.createPosts({ body, req, res })
);

module.exports = router;
