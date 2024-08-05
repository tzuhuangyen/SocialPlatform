import React from 'react';
import { Container, Nav, NavDropdown } from 'react-bootstrap';

import userAvatar from '/image/user.png';

const Navbar = (props) => {
  return (
    <div>
      {' '}
      <Nav className='border-bottom border-dark mb-4'>
        <Container fluid='lg'>
          <Nav className='d-flex justify-content-between'>
            <h1 className='logo'>MetaWall</h1>
            <div className='member d-flex align-items-center'>
              <NavDropdown title='Dropdown' id='nav-dropdown'>
                <NavDropdown.Item href='#/MetaWall'>MetaWall</NavDropdown.Item>
                <NavDropdown.Item href='#/profile'>profile</NavDropdown.Item>
                <NavDropdown.Item href='#/logout'>logout</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </div>
          </Nav>
        </Container>
      </Nav>
    </div>
  );
};

export default Navbar;
