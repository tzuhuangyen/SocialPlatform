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
import user1 from '/image/user1.png';
// import EmptyPostWall from './EmptyPostwall';
import nft from '/image/nft.jpg';

const Posts = () => {
  return (
    <>
      <div className=' postWallComment postsWall'>
        <div className='posts'>
          <div className='post'>
            <div className='mb-2 d-flex align-items-center'>
              <img
                src={user1}
                alt='userAvatar'
                className='me-3'
                style={{
                  width: '45px',
                  height: '45px',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <div>
                <p className='userName'>Mikasha</p>
                <span>2024/08/14</span>
              </div>
            </div>
            <div className='postContent mb-2'>I got THE NFT! YA!</div>
            <div className='postImages'>
              <img src={nft} alt='' />
            </div>
            <div className='likes mt-2 d-flex align-items-center'>
              <p>
                <BiLike />
              </p>
              <p className='ms-1'>be the first one likes this post</p>
            </div>
            <div className='comment d-flex mt-3'>
              <img
                src={user2x}
                alt=''
                style={{ width: '40px', height: '40px' }}
              />
              <Form.Control
                type='text'
                placeholder='Envy it!!'
                style={{
                  borderRadius: 0 /* Apply border-radius directly to Form.Control */,
                }}
                className='ms-2'
              />
              <Button
                type='submit'
                style={{
                  borderRadius: 0,
                }}
                className='commentSendBtn'
              >
                send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
