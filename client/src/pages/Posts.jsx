import React from 'react';
import { Container, Row, Col, Dropdown, Button, Form } from 'react-bootstrap';
import { FaSearch, FaRegThumbsUp } from 'react-icons/fa';
import { TiBell } from 'react-icons/ti';

import user2x from '/image/user@2x.png';
import petsloveCover from '/image/petslove-cover.png';
import user62x from '/image/user6@2x.png';
import Filters from './Filters';

const PostsWall = () => {
  return (
    <>
      <Container fluid='lg'>
        <Row>
          <Col lg={9}>
            <Row className='filters mb-2'>
              <Filters />
              <Col lg={9}>
                <EmptyPostWall />
                <div
                  className='search d-flex justify-content-between align-items-center'
                  style={{ border: '1px solid #000400' }}
                >
                  <Form.Control
                    type='text'
                    placeholder='Search'
                    className=' mr-sm-2'
                    style={{
                      borderRadius: 0 /* Apply border-radius directly to Form.Control */,
                    }}
                  />
                  <Button
                    type='submit'
                    style={{
                      borderRadius: 0,
                    }}
                  >
                    <FaSearch />
                  </Button>
                </div>
              </Col>
            </Row>

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
          <Col lg={3}>
            <div className='sideBar'>
              {' '}
              <button
                className='mb-3'
                style={{
                  width: '100%',
                  backgroundColor: '#03438D',
                  boxShadow: '-2px 2px 0px #000400',
                }}
              >
                post your thought{' '}
              </button>
              <ul>
                <li className='sideBar-List'>
                  {' '}
                  <img
                    className='me-3'
                    style={{ width: '50px' }}
                    src={user2x}
                    alt='user'
                  />
                  <p className='userName'>Jay</p>
                </li>
                <li className='sideBar-List '>
                  <p className='icon-circle'>
                    <TiBell size={30} />
                  </p>
                  <p>Follow List</p>
                </li>
                <li className='sideBar-List'>
                  <p className='icon-circle'>
                    <FaRegThumbsUp size={25} />
                  </p>

                  <p className='userName'>Likes</p>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PostsWall;
