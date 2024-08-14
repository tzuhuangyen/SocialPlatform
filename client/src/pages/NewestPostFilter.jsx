import React from 'react';
import { Col, Dropdown } from 'react-bootstrap';

const NewestPostFilter = (props) => {
  return (
    <Col lg={3}>
      {' '}
      <Dropdown>
        <Dropdown.Toggle
          id='dropdown-basic'
          style={{
            backgroundColor: '#ffffff',
            color: '#333',
            borderRadius: '2px',
          }}
        >
          Newest Posts
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
          <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
          <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
};

export default NewestPostFilter;
