import './App.css';
import './assets/styles/all.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../src/styles/all.scss';

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MetaWall from './pages/MetaWall';
import FollowList from './pages/FollowerList';
import ArticlesLike from './pages/ArticlesLike';
import AllPostWall from './pages/AllPostWall';
function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/metaWall' element={<MetaWall />}>
        <Route index element={<AllPostWall />} />
        <Route path='userPostWall' element={<FollowList />} />
        <Route path='followList' element={<FollowList />} />

        <Route path='articlesLikes' element={<ArticlesLike />} />
      </Route>{' '}
    </Routes>
  );
}

export default App;
