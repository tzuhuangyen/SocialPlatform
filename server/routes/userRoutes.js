const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('hello user');
});

router.get('/login', (req, res, next) => {
  res.send('User login');
});

module.exports = router;
