const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    name: '洧杰',
  });
});

router.get('/login', (req, res, next) => {
  res.status(200).json({
    name: 'login',
  });
});

module.exports = router;
