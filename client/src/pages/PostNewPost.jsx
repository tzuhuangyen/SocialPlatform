import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const backendUrl = `${import.meta.env.VITE_BACKEND_URL}`;
//
const PostNewPost = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setContent(e.target.value);
  };
  // const handleImageUpdate = (e) => {
  //   setImage(e.target.files[0]);
  // };
  // const fetchPosts = async () => {
  //   const token = localStorage.getItem('Token');
  //   try {
  //     const response = await axios.get(`${backendUrl}/aip/posts/`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setPosts(response.data.posts);
  //   } catch (error) {
  //     console.error(
  //       'Error fetching posts:',
  //       error.response?.data || error.message
  //     );
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('Token');
    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    try {
      const response = await axios.post(`${backendUrl}/api/posts/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          //// 如果上传了文件，需要设置 Content-Type 为 multipart/form-data
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Post created successfully:', response.data);
      //跳轉到userPostWall並display新的貼文
      // 在成功创建帖子后重新获取帖子列表
      // fetchPosts();
      setContent('');
      setImage(null);
      navigate('/MetaWall/userPostWall');
    } catch (error) {
      console.error(
        'Error creating post:',
        error.response?.data || error.message
      );
    }
  };
  return (
    <div>
      {' '}
      <div className='followListsTitle'>whats in your mind?</div>
      <div className='createPost'>
        <form onSubmit={handleSubmit} className='d-flex flex-column mb-4'>
          {' '}
          <label htmlFor='form'>Context</label>
          <textarea
            id='content'
            onChange={handleChange}
            value={content}
            type='text'
            placeholder='whats in your mind?'
            style={{ width: '100%', height: '150px', padding: '16px' }}
          />
          {/* <input
            className='d-flex flex-column mb-4 mt-3 updateImgBtn'
            type='file'
            accept='image/*'
            onChange={handleImageUpdate}
          /> */}
          <div className='imageBanner'>
            {' '}
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt='Preview'
                style={{ width: '100px', height: '100px' }}
              />
            )}
          </div>
          <p style={{ color: 'red' }} className='text-center'>
            圖片檔案過大，僅限 1mb 以下檔案 <br />
            圖片格式錯誤，僅限 JPG、PNG 圖片
          </p>
          <button type='submit' className='postBtn'>
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostNewPost;
