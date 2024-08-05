import React from 'react';

const EmptyPostWall = () => {
  return (
    <>
      <div className='emptyPost'>
        <ul className='dot-container '>
          <li className='dot dot1'></li>
          <li className='dot dot2'></li>
          <li className='dot dot3'></li>
        </ul>
        <p className='text-center' style={{ padding: '32px' }}>
          目前尚無動態，新增一則貼文吧！
        </p>
      </div>
    </>
  );
};

export default EmptyPostWall;
