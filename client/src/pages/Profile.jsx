import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import user62x from '/image/user6@2x.png';

const Profile = () => {
  return (
    <div>
      <div className='followListsTitle'>Edit Profile</div>
      <Tabs
        defaultActiveKey='profile'
        id='justify-tab-example'
        className='mb-3'
      >
        <Tab eventKey='profile' title='Edit profile'>
          <div className='profileWall'>
            <div className='updateImg mb-4 d-flex flex-column align-items-center'>
              <img src={user62x} alt='' className='mb-3' />
              <button type='submit'>update picture</button>
            </div>
            <div className='changeName mb-3 d-flex flex-column'>
              <label htmlFor=''>nickName</label>
              <input
                type='text'
                placeholder='change your nickName?'
                className=' p-3'
              />
            </div>

            <button type='submit'>Submit</button>
          </div>
        </Tab>
        <Tab eventKey='password' title='reset Password'>
          <div className='profileWall'>
            <div className='changePsw mb-3 d-flex flex-column'>
              <label htmlFor='new-password'>enter new password </label>
              <input
                type='password'
                placeholder='enter new password'
                className=' p-3'
              />
            </div>
            <div className='mb-4 d-flex flex-column'>
              <label htmlFor='confirm-password'>enter again</label>
              <input
                type='password'
                placeholder='enter  again'
                className=' p-3 '
              />
            </div>
            <button type='submit'>Submit</button>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Profile;
