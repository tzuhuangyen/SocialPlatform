import React from 'react';
import { Container, Row, Col, Dropdown, Button, Form } from 'react-bootstrap';
import { FaSearch, FaRegThumbsUp } from 'react-icons/fa';
import { TiBell } from 'react-icons/ti';
import { Link, Outlet } from 'react-router-dom';
import { BiLike } from 'react-icons/bi';

import user2x from '/image/user@2x.png';
import petsloveCover from '/image/petslove-cover.png';
import user62x from '/image/user6@2x.png';
import user6 from '/image/user6.png';
import PostWallTemplate from './PostWallTemplate';
import PostWithComment from './PostWallComment';
import { MdOutlineModeComment } from 'react-icons/md';

const AllPosts = () => {
  return (
    <Container fluid='lg' className='p-0'>
      <Row>
        <Col>
          <PostWallTemplate />

          <div className='comments'>
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
        </Col>
      </Row>
    </Container>
  );
};

export default AllPosts;
