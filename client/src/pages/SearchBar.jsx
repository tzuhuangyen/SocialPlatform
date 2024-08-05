import React from 'react';
import { Container, Row, Col, Dropdown, Button, Form } from 'react-bootstrap';
import { FaSearch, FaRegThumbsUp } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div>
      {' '}
      <Col lg={9}>
        <div
          className='search d-flex justify-content-between align-items-center'
          style={{ border: '1px solid #000400' }}
        >
          <Form.Control
            type='text'
            placeholder='Search'
            className=' mr-sm-2'
            style={{
              borderRadius: 0 /* Apply border-radius directly to Form.Control */,
            }}
          />
          <Button
            type='submit'
            style={{
              borderRadius: 0,
            }}
          >
            <FaSearch />
          </Button>
        </div>
      </Col>
    </div>
  );
};

export default SearchBar;
