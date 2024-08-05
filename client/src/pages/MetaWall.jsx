import React from 'react';
import { Container, Row, Col, Dropdown, Button } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import NewestPostFilter from './NewestPostFilter';
import SearchBar from './SearchBar';
import SideBar from './SideBar';

const MetaWall = () => {
  return (
    <>
      <Navbar />
      <Container fluid='lg'>
        <Row>
          <Col lg={9}>
            <Row className='filters mb-2'>
              <NewestPostFilter />
              <SearchBar />
            </Row>

            <Outlet />
          </Col>
          <Col lg={3}>
            <SideBar />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MetaWall;
