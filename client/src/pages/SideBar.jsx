import React from 'react';
import { Col } from 'react-bootstrap';
import user2x from '/image/user@2x.png';
import { TiBell } from 'react-icons/ti';
import { FaRegThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const SideBar = () => {
  return (
    <>
      <div className='sideBar'>
        <button className='mb-3 sideBarBtn'>
          <Link
            to='PostNewPost'
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            what's in your mind
          </Link>{' '}
        </button>
        <ul className='ps-0'>
          <li className='sideBar-List mb-3'>
            {' '}
            <Link
              to='userPostWall'
              className='d-flex align-items-center fw-bold'
              style={{
                color: 'black',
                fontSize: '16px',
                textDecoration: 'none',
              }}
            >
              <img
                className='me-3'
                style={{ width: '50px' }}
                src={user2x}
                alt='user'
              />
              <p className=' mb-0'>JayWall</p>{' '}
            </Link>
          </li>
          <li className='sideBar-List '>
            <Link
              to='followList'
              className='d-flex align-items-center'
              style={{ textDecoration: 'none' }}
            >
              <p className='icon-circle'>
                <TiBell size={30} />
              </p>
              <p className='fw-bold' style={{ color: 'black' }}>
                Follow List
              </p>
            </Link>
          </li>
          <li className='sideBar-List'>
            <Link
              to='articlesLikes'
              style={{ textDecoration: 'none' }}
              className='d-flex align-items-center'
            >
              <p className='icon-circle'>
                <FaRegThumbsUp size={23} />
              </p>

              <p className='userName fw-bold' style={{ color: 'black' }}>
                Articles I Likes
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
