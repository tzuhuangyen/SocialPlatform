import React from 'react';
import user5 from '/image/user5.png';
import SearchBar from './SearchBar';
import NewestPostFilter from './NewestPostFilter';
import PostWallTemplate from './PostWallTemplate';

const UserPostWall = () => {
  return (
    <>
      <div>
        <div className='row followCard ms-0'>
          <div className='col-2 card-left ps-0'>
            <img src={user5} alt='' />
          </div>

          <div className='col-10 card-right'>
            <div className='card-text'>
              <div className='card-title'>Alter</div>
              <div className='card-subtitle'>987,987 follower</div>
            </div>
            <button className='follow-btn'>Follow</button>
          </div>
        </div>
        <div className='row followCard ms-0'>
          <div className='col-2 card-left ps-0'>
            <img src={user5} alt='' />
          </div>

          <div className='col-10 card-right'>
            <div className='card-text'>
              <div className='card-title'>Beca</div>
              <div className='card-subtitle'>987 follower</div>
            </div>
            <button className='unfollow-btn'>unFollow</button>
          </div>
        </div>
        <div className='row mb-4'>
          <NewestPostFilter />
          <SearchBar />
        </div>
        <PostWallTemplate />
      </div>
    </>
  );
};

export default UserPostWall;
