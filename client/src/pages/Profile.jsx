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
  //修改密碼 暱稱
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    nickname: '',
  });
  // 修改email
  const [userData, setUserData] = useState({
    nickname: '',
    email: '',
  });
  // 用于存储选择的文件
  const [selectedFile, setSelectedFile] = useState(null);
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
  //擷取input內的值
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
  //上傳照片
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  //提交上傳照片
  const handleSubmitFile = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('upload failed');
      return;
    }
    const token = localStorage.getItem('Token');
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(
        `${backendUrl}/api/users/upload/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('File uploaded successfully:', response.data.imgUrl);
      setUserData((prev) => ({ ...prev, photo: response.data.imgUrl }));
    } catch (error) {
      console.error(
        'Error uploading image:',
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
              <img
                src={userData.photo || user62x}
                alt='Profile'
                className='mb-3'
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  border: ' 2px solid #000400',
                  opacity: '1',
                  objectFit: 'contain',
                }}
              />
              <form
                onSubmit={handleSubmitFile}
                encType='multipart/form-data'
                className='d-flex flex-column align-items-center  justify-content-center'
              >
                <div className=' text-center ms-4'>
                  {' '}
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                    className='mb-3'
                  />
                </div>

                <button type='submit'>Update Picture</button>
              </form>
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
