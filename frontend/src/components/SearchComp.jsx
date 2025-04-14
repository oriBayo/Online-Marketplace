import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SearchComp = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      setKeyword('');
      navigate(`/products/search/${keyword}`);
    } else {
      navigate('/products');
    }
  };
  return (
    <Form onSubmit={submitHandler} className='d-flex border w-25 me-3 '>
      <Form.Control
        type='search'
        placeholder='Search'
        className='me-2 '
        aria-label='Search'
        size='sm'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button type='submit' variant='outline-dark btn-sm'>
        Search
      </Button>
    </Form>
  );
};

export default SearchComp;
