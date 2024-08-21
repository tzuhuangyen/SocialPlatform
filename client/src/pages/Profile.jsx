import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import user62x from '/image/user6@2x.png';
const backendUrl = `${import.meta.env.VITE_BACKEND_URL}`;
import { useNavigate } from 'react-router-dom';
import { showUpdatePswAlert, showUpdateNicknameAlert } from '../swal';
import axios from 'axios';

//

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    nickname: '',
  });
  const [userData, setUserData] = useState({
    nickname: '',
    email: '',
  });
  //登入後即可渲染profile
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('Token');
        const response = await axios.get(`${backendUrl}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched user data:', response.data.user); // 查看获取的数据
        setUserData(response.data.user);
      } catch (error) {
        console.error(
          'Error fetching user data:',
          error.response?.data || error.message
        );
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((preState) => ({ ...preState, [id]: value }));
  };
  //提交變更暱稱
  const handleSubmitNickname = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('Token');
    const { nickname } = formData; // 从 formData 中获取 nickname
    try {
      const response = await axios.patch(
        `${backendUrl}/api/users/updateProfile`,
        { nickname },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Nickname updated successfully:', response.data);
      setUserData((prev) => ({ ...prev, nickname }));
      showUpdateNicknameAlert();
    } catch (error) {
      console.error(
        'Error updating nickname:',
        error.response?.data || error.message
      );
    }
  };
  //提交變更密碼
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    const token = localStorage.getItem('Token');

    try {
      const response = await axios.post(
        `${backendUrl}/api/users/updatePassword`,
        {
          password,
          confirmPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('update password successful:', response.data);
      showUpdatePswAlert();
      setTimeout(() => {
        navigate(`/metaWall/profile`);
      }, 500);
    } catch (error) {
      console.error(
        'Error updating password:',
        error.response?.data || error.message
      );
    }
  };

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
            <h2 className='text-center'>{userData.nickname} = (edge Jay)</h2>
            <div className='updateImg mb-4 d-flex flex-column align-items-center'>
              <img src={user62x} alt='' className='mb-3' />
              <button type='submit'>update picture</button>
            </div>
            <form
              onSubmit={handleSubmitNickname}
              className='changeName mb-3 d-flex flex-column'
            >
              <label htmlFor=''>nickName</label>
              <input
                id='nickname'
                onChange={handleChange}
                value={formData.nickname}
                type='text'
                placeholder={`${
                  userData.nickname || ''
                } wants to change your nickName?`}
                className=' p-3'
              />
              <label htmlFor=''>email: {userData.email || 'Loading...'}</label>

              <button type='submit'>Submit</button>
            </form>
          </div>
        </Tab>
        <Tab eventKey='password' title='reset Password'>
          <div className='profileWall'>
            <form
              onSubmit={handleSubmit}
              className='changePsw mb-3 d-flex flex-column'
            >
              <label htmlFor='new-password'>enter new password </label>
              <input
                type='password'
                placeholder='enter new password'
                className=' p-3'
                id='password'
                value={formData.password}
                onChange={handleChange}
              />{' '}
              <div className='mb-4 d-flex flex-column'>
                <label htmlFor='confirm-password'>enter again</label>
                <input
                  type='password'
                  placeholder='enter again'
                  className=' p-3 '
                  id='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <button type='submit'>Submit</button>
            </form>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Profile;
