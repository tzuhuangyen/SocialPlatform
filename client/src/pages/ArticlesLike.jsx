import React from 'react';
import user62x from '/image/user6@2x.png';
import { FaRegThumbsUp } from 'react-icons/fa';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';

const ArticlesLike = () => {
  return (
    <>
      {' '}
      <div>
        <div className='followListsTitle'>The posts I like</div>
        <ul className='follow comments'>
          <li className=' mb-2 d-flex align-items-center justify-content-between'>
            <div className='d-flex '>
              <img src={user62x} alt='' className='me-3' />
              <div className='user-info'>
                <div className='d-flex justify-content-between'>
                  <div className='user-details'>
                    <p className='userName'>BoGi</p>
                    <div className='text-muted'>Posted time: 2024/07/09</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='icon d-flex'>
              <div className='cancel me-4 d-flex flex-column align-items-center'>
                <FaRegThumbsUp size={20} style={{ color: 'blue' }} />
                <p>cancel</p>
              </div>
              <div className='check d-flex flex-column align-items-center'>
                <IoArrowForwardCircleOutline size={20} />
                <p>check</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ArticlesLike;
