import React from 'react';
import { Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom

import user2x from '/image/user@2x.png';
const Navbar = (props) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('Token');
    navigate('/');
  };

  return (
    <div>
      {' '}
      <Nav className='border-bottom border-dark mb-4'>
        <Container fluid='lg'>
          <Nav className='d-flex justify-content-between'>
            <h1 className='logo'>MetaWall</h1>
            <div className='member d-flex align-items-center'>
              <img
                src={user2x}
                alt=''
                style={{ width: '30px', height: '30px' }}
              />

              <NavDropdown title='Member' id='nav-dropdown'>
                <NavDropdown.Item
                  as={Link}
                  to='/metaWall'
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                  }}
                >
                  MetaWall
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to='/metaWall/profile'
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                  }}
                >
                  profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                  }}
                  onClick={logout}
                >
                  logout
                </NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
              </NavDropdown>
            </div>
          </Nav>
        </Container>
      </Nav>
    </div>
  );
};

export default Navbar;
