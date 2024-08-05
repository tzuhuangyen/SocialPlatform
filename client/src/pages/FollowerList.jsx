import React from 'react';
import user62x from '/image/user6@2x.png';

const FollowerList = () => {
  return (
    <div>
      <p>FollowerLists</p>
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
    </div>
  );
};

export default FollowerList;
