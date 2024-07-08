import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import loginBanner from '/image/loginBanner.jpg';
const Login = (props) => {
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
            <form>
              <div className='form-group mb-3'>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  placeholder='Email'
                />
              </div>
              <div className='form-group mb-3'>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  placeholder='Password'
                />
              </div>
              <button type='submit' className='btn btn-primary submitBtn'>
                Log in
              </button>
            </form>
            <div className='text-center mt-3'>
              <Link to='/signup'>sign up</Link>
            </div>
          </div>
        </div>
        <Link to='/postsWall' className='btn btn-primary'>
          test to see posts wall
        </Link>
      </Container>{' '}
    </div>
  );
};

export default Login;
