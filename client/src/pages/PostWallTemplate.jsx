import React from 'react';
import user2x from '/image/user@2x.png';
import petsloveCover from '/image/petslove-cover.png';
import { MdOutlineModeComment } from 'react-icons/md';
import { BiLike } from 'react-icons/bi';

const PostWallTemplate = () => {
  return (
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
          <div className='postContent mb-2'>
            its super COLD outside.... <br />
            just stay in BED
          </div>
          <div className='postImages'>
            <img src={petsloveCover} alt='' />
          </div>
          <ul className='d-flex flex-row ps-0 mt-4'>
            <li className='likes me-2'>
              <a href='#'>
                <BiLike />
                Like
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
      </div>
    </div>
  );
};

export default PostWallTemplate;
