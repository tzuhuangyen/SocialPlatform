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
            color: 'black',
            borderRadius: '2px',
            backgroundColor: 'white',
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
