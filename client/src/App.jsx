import './App.css';
import './assets/styles/all.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../src/styles/all.scss';

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PostsWall from './pages/PostsWall';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/postsWall' element={<PostsWall />} />
    </Routes>
  );
}

export default App;
