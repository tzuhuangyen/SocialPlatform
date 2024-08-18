import React from 'react';

const PostNewPost = () => {
  return (
    <div>
      {' '}
      <div className='followListsTitle'>whats in your mind?</div>
      <div className='createPost'>
        <div className='d-flex flex-column mb-4'>
          {' '}
          <label htmlFor=''>context</label>
          <input
            type='text'
            placeholder='whats in your mind?'
            style={{ width: '100%', height: '150px', padding: '16px' }}
          />
        </div>
        <div className='d-flex flex-column mb-4'>
          <button className='mb-4 updateImgBtn'>update picture</button>
          <div className='imageBanner'>
            {' '}
            <img src='' alt='' />
          </div>
        </div>
        <p style={{ color: 'red' }} className='text-center'>
          圖片檔案過大，僅限 1mb 以下檔案 <br />
          圖片格式錯誤，僅限 JPG、PNG 圖片
        </p>
        <button className='postBtn'>Post</button>
      </div>
    </div>
  );
};

export default PostNewPost;
