const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/postControllers');
const handleErrorAsync = require('../service/handleErrorAsync');

router.get('/', handleErrorAsync(postControllers.getPosts));

router.post('/', handleErrorAsync(postControllers.createPosts));

module.exports = router;
