import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import loginBanner from '/image/loginBanner.jpg';
import axios from 'axios';
const backendUrl = `${import.meta.env.VITE_BACKEND_URL}`;
// console.log('Backend URL:', backendUrl);
import { showSignUpAlert, showSignUpErrorAlert } from '../swal';

// 1. 前端: 发送注册请求
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((preState) => ({
      ...preState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nickname, email, password, confirmPassword } = formData;
    try {
      const response = await axios.post(`${backendUrl}/api/users/sign_up`, {
        nickname,
        email,
        password,
        confirmPassword,
      });
      console.log('Registration successful:', response);
      const { token } = response.data.user;
      // 存储 token
      localStorage.setItem('Token', token);
      console.log('Token stored in localStorage:', token);

      showSignUpAlert(nickname);
      navigateWithDelay('/');
    } catch (error) {
      handleSignUpError(error);
    }
  };
  const navigateWithDelay = (path, delay = 500) => {
    setTimeout(() => navigate(path), delay);
  };

  const handleSignUpError = (error) => {
    if (error.response) {
      console.error('Registration failed:', error.response.data);
      showSignUpErrorAlert(error.response.data.massage);
    } else {
      console.error('Registration failed:', error.message);
    }
  };
  return (
    <div>
      {' '}
      <div>
        <Container className=' d-flex justify-content-center align-items-center vh-100'>
          <div className='login-card p-5 shadow d-flex  justify-content-center align-items-center'>
            <div className='image-container'>
              <img
                src={loginBanner}
                alt='Login Banner'
                className='login-image'
              />
            </div>
            <div className='form-container'>
              <h1 className='text-center'>MetaWall</h1>
              <h2 className='text-center mb-4'>sign up</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-group mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='nickname'
                    placeholder='Nickname'
                    value={formData.nickname}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group mb-3'>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    placeholder='email'
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
                <div className='form-group mb-3'>
                  <input
                    type='password'
                    className='form-control'
                    id='confirmPassword'
                    placeholder='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <button type='submit' className='btn btn-primary submitBtn'>
                  Sign Up
                </button>
              </form>
              <div className='text-center mt-3'>
                <Link to='/'>Login</Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SignUp;
