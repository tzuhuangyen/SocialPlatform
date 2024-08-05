import React from 'react';
import { Container, Row, Col, Dropdown, Button, Form } from 'react-bootstrap';
import { FaSearch, FaRegThumbsUp } from 'react-icons/fa';
import { TiBell } from 'react-icons/ti';
import { Link, Outlet } from 'react-router-dom';

import user2x from '/image/user@2x.png';
import petsloveCover from '/image/petslove-cover.png';
import user62x from '/image/user6@2x.png';

import EmptyPostWall from './EmptyPostwall';
const Posts = () => {
  return (
    <>
      <Container fluid='lg'>
        <Row>
          <Col lg={9}>
            <EmptyPostWall />
            <div className='postsWall'>
              <div className='posts'>
                <div className='post'>
                  <div className='mb-2 d-flex align-items-center'>
                    <img
                      src={user2x}
                      alt='userAvatar'
                      className='me-3'
                      style={{ width: '45px', height: '45px' }}
                    />
                    <div>
                      <p className='userName'>Jay</p>
                      <span>2024/07/08</span>
                    </div>
                  </div>
                  <div className='postContent mb-2'>test test</div>
                  <div className='postImages'>
                    <img src={petsloveCover} alt='' />
                  </div>
                </div>
              </div>
            </div>
            <div className='comments'>
              <div className='mb-2 comment d-flex align-items-center'>
                <img src={user62x} alt='' className='me-3' />
                <div className='ms-2'>
                  <div className='userName'>BoGi</div>
                  <span>2024/07/09</span>
                </div>
              </div>
              <div className='replayContent'>test test</div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Posts;
