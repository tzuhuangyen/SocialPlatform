const multer = require('multer');

const uploadControllers = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

module.exports = uploadControllers;
