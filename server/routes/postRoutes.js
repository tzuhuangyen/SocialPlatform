const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/postControllers');
const handleErrorAsync = require('../service/handleErrorAsync');
const { isAuth } = require('../service/auth');

router.get('/', handleErrorAsync(postControllers.getPosts));

router.post('/', isAuth, handleErrorAsync(postControllers.createPosts));

module.exports = router;
