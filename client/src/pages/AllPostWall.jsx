import React from 'react';
import { Row } from 'react-bootstrap';

import user62x from '/image/user6@2x.png';
import PostWallTemplate from './PostWallTemplate';
import PostWithComment from './PostWallComment';
import NewestPostFilter from './NewestPostFilter';
import SearchBar from './SearchBar';

import { BiLike } from 'react-icons/bi';
import { MdOutlineModeComment } from 'react-icons/md';

const AllPosts = () => {
  return (
    <>
      <Row className='mb-3'>
        {' '}
        <NewestPostFilter />
        <SearchBar />
      </Row>

      <PostWallTemplate />

      <div className='otherUserPost comments '>
        <div className='mb-2 comment d-flex align-items-center'>
          <img src={user62x} alt='' className='me-3' />
          <div className='ms-2'>
            <div className='userName'>BoGi</div>
            <span>2024/07/09</span>
          </div>
        </div>
        <div className='replayContent'>Im going to be a Great King</div>
        <ul className='d-flex align-items-center mt-4'>
          <li className='likes me-2'>
            <a href='#'>
              <BiLike />
              10
            </a>
          </li>
          <li className='comment'>
            <a href='#'>
              <MdOutlineModeComment size={18} />
              Comment
            </a>
          </li>
        </ul>
      </div>

      <PostWithComment />
    </>
  );
};

export default AllPosts;
