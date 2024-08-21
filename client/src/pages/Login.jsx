import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import loginBanner from '/image/loginBanner.jpg';
import axios from 'axios';
const backendUrl = `${import.meta.env.VITE_BACKEND_URL}`;
import { showLoginAlert, showLoginErrorAlert } from '../swal';

const Login = (props) => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const token = localStorage.getItem('Token');
    try {
      const response = await axios.post(`${backendUrl}/api/users/login`, {
        email,
        password,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Login successful:', response.data);
      // 从服务器响应中提取 token
      const newToken = response.data.user.token;
      // 存储 token
      localStorage.setItem('Token', newToken);
      setTimeout(() => {
        navigate(`/metaWall`);
      }, 500);
    } catch (error) {
      if (error.response) {
        setLoginState(error.response.data);
        console.error('Login Failed:', error.response.data);
      } else {
        // 处理没有 response 的错误，比如网络错误
        console.error('Login Failed:', error.message);
        setLoginState({ message: 'Login failed due to network error.' });
      }
      showLoginErrorAlert();
    }
  };
  return (
    <div>
      <Container className=' d-flex justify-content-center align-items-center vh-100'>
        <div className='login-card p-5 shadow d-flex  justify-content-center align-items-center'>
          <div className='image-container'>
            <img src={loginBanner} alt='Login Banner' className='login-image' />
          </div>
          <div className='form-container'>
            <h1 className='text-center'>MetaWall</h1>
            <p className='text-center mb-4'>到元宇宙展開全新社交圈</p>
            <form onSubmit={handleSubmit}>
              <div className='form-group mb-3'>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-3'>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <p
                className={`${loginState.message ? 'd-block' : 'd-none'}`}
                style={{ color: '#F57375' }}
              >
                {loginState.message}
              </p>
              <button type='submit' className='btn btn-primary submitBtn'>
                Log in
              </button>
            </form>
            <div className='text-center mt-3'>
              <Link to='/signup'>sign up</Link>
            </div>
          </div>
        </div>
        <Link to='/MetaWall' className='btn btn-primary'>
          test to see posts MetaWall
        </Link>
      </Container>{' '}
    </div>
  );
};

export default Login;
