//單純處理上傳圖片 middleware
const multer = require('multer');
const path = require('path');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
      cb(
        new Error('file format is not supported,only jpg, png, jpeg is allowed')
      );
    }
    cb(null, true);
  },
}).single('file'); //any?

module.exports = upload;
