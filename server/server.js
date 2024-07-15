const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const connectDB = require('./connections/connectMongo');
connectDB();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger-output.json');
//捕捉程式重大錯誤 這個要放最前面
process.on('uncaughtException', (err) => {
  console.error('uncaught Exception!');
  console.error(err.name);
  console.error(err.message);
  console.error(err.stack);
  process.exit(1);
});

// const corsOptions = {
//   origin: ['https://tzuhuangyen.github.io', 'http://localhost:5173'], // 允許您的前端域
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// const imagesPath = path.join(__dirname, '..', 'client', 'public', 'images');
// console.log(imagesPath);

// express.static('public/Images')
// app.use('/adminProducts', express.static('public/Images'));
// app.use((req, res, next) => {
//   console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
//   next();
// });

// 日志中间件
// app.use((req, res, next) => {
//   console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
//   next();
// });

// This is a function that takes in 'req' and 'res' objects as parameters.
// The function is expected to return a JSON response.

// 將用戶路由挂載到 /api/users 路徑下
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// 404 找不到頁面 錯誤處理程序 一定要有的錯誤處理程序
app.use((req, res, next) => {
  res.status(404).send('404 not found pages');
});
const resErrorProd = (err, res) => {
  console.error(err.message);
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('something went wrong', err);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};
const resErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
// express全域錯誤捕捉 一定要有的錯誤處理程序
app.use((err, req, res, next) => {
  console.log(err.name);
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'dev') {
    return resErrorDev(err, res);
  }
  //production mongoose
  if (err.name === 'ValidationError') {
    err.message = 'please enter again';
    err.isOperational = true;
    return resErrorDev(err, res);
  }
  resErrorProd(err, res);
});
//未捕捉到 api 的catch
process.on('unhandleRejection', (err, promise) => {
  console.error('uncaught Rejection!', promise, 'reason', err);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`socialPlatform's Server Started at  ${PORT}`);
});

// module.exports = app;
