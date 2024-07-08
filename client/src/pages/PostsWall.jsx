import React from 'react';
import { Container, Row, Col, Nav, NavDropdown } from 'react-bootstrap';
import userAvatar from '/image/user.png';
const PostsWall = () => {
  return (
    <>
      <Nav className='border-bottom border-dark'>
        <Container fluid='lg'>
          <Nav className=' d-flex justify-content-between '>
            <h1 className='logo'>MetaWall</h1>
            <div className='member d-flex  align-items-center'>
              <img src={userAvatar} alt='userAvatar' />
              <NavDropdown title='Dropdown' id='nav-dropdown'>
                <NavDropdown.Item eventKey='4.1'>Action</NavDropdown.Item>
                <NavDropdown.Item eventKey='4.2'>
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item eventKey='4.3'>
                  Something else here
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey='4.4'>
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>{' '}
            </div>
          </Nav>
        </Container>
      </Nav>
    </>
  );
};

export default PostsWall;
