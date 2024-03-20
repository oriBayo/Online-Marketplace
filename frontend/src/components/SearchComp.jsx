import { Form, InputGroup } from 'react-bootstrap'

const SearchComp = ({ productToSearch, setProductToSearch }) => {
  return (
    <InputGroup className='my-5'>
      <Form.Control
        className='border border-dark'
        placeholder='Search Product'
        aria-label="Recipient's username"
        aria-describedby='basic-addon2'
        value={productToSearch}
        onChange={(e) => setProductToSearch(e.target.value)}
      />
    </InputGroup>
  )
}

export default SearchComp
