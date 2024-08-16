import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import SideBar from './SideBar';

const MetaWall = () => {
  return (
    <>
      <Navbar />
      <Container fluid='lg'>
        <Row>
          <Col lg={9}>
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
