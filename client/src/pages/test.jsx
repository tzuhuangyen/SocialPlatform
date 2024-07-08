import React from 'react';
import { Container, Row, Col, Nav, NavDropdown } from 'react-bootstrap';

const PostsWall = () => {
  const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

  return (
    <div>
      <Container fluid='lg'>
        <Nav
          className='d-flex justify-content-between align-items-center'
          variant='pills'
          activeKey='1'
          onSelect={handleSelect}
        >
          <Nav.Item>
            <Nav.Link eventKey='1' href='#/home'>
              NavLink 1 content
            </Nav.Link>
          </Nav.Item>

          <NavDropdown title='Dropdown' id='nav-dropdown'>
            <NavDropdown.Item eventKey='4.1'>Action</NavDropdown.Item>
            <NavDropdown.Item eventKey='4.2'>Another action</NavDropdown.Item>
            <NavDropdown.Item eventKey='4.3'>
              Something else here
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey='4.4'>Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Row>
          <Col lg={9}>
            <div>
              {' '}
              <div className='newestPost'></div>
              <div className='search'></div>
            </div>
            <div className='posts'>
              <div className='post'>
                <div>
                  <div className='userAvatar'></div>
                  <div className='userName'>name</div>
                  <span>Date</span>
                </div>
                <div className='postContent'>test test</div>
                <div className='postImages'>
                  <img src='/image/petslove-cover.png' alt='' />
                </div>
              </div>
            </div>
            <div className='comments'>
              <div className='comment'>
                <div>
                  <div className='userAvatar'></div>
                  <div className='userName'>name</div>
                  <span>Date</span>
                </div>
                <div className='replayComment'></div>
                <div className='replayComment'></div>
              </div>
            </div>
          </Col>
          <Col lg={3}>
            <button>post your thought </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PostsWall;
