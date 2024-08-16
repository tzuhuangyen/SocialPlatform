import React from 'react';
import user62x from '/image/user6@2x.png';

const FollowLists = () => {
  return (
    <>
      <div className='followListsTitle'>FollowLists</div>
      <ul className='follow comments'>
        <li className=' mb-2 d-flex align-items-center'>
          <div className='user-info'>
            <img src={user62x} alt='' className='me-3' />
            <div className='user-details'>
              <p className='userName'>BoGi</p>

              <div className='text-muted'>Follow time: 2024/07/09</div>
              <span className='text-muted'>
                {' '}
                You follow this user for 90 days!
              </span>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default FollowLists;
