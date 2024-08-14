import React from 'react';
import { Col } from 'react-bootstrap';
import user2x from '/image/user@2x.png';
import { TiBell } from 'react-icons/ti';
import { FaRegThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const SideBar = () => {
  return (
    <div>
      {' '}
      <div className='sideBar'>
        {' '}
        <button className='mb-3 sideBarBtn'>post your thought </button>
        <ul>
          <li className='sideBar-List'>
            {' '}
            <Link to='userPostWall' className='d-flex align-items-center'>
              <img
                className='me-3'
                style={{ width: '50px' }}
                src={user2x}
                alt='user'
              />
              <p className='userName'>JayWall</p>{' '}
            </Link>
          </li>
          <li className='sideBar-List '>
            <Link to='followList' className='d-flex align-items-center'>
              <p className='icon-circle'>
                <TiBell size={30} />
              </p>
              <p>Follow List</p>
            </Link>
          </li>
          <li className='sideBar-List'>
            <Link to='articlesLikes' className='d-flex align-items-center'>
              <p className='icon-circle'>
                <FaRegThumbsUp size={25} />
              </p>

              <p className='userName'>Likes</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
