import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import loginBanner from '/image/loginBanner.jpg';
const SignUp = () => {
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
              <p className='text-center mb-4'>sign up</p>
              <form>
                <div className='form-group mb-3'>
                  <input
                    type='nickname'
                    className='form-control'
                    id='nickname'
                    placeholder='nickname'
                  />
                </div>
                <div className='form-group mb-3'>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    placeholder='email'
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
