import { Spinner } from 'react-bootstrap'

const LoaderComp = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        height: '100px',
        width: '100px',
        margin: 'auto',
        display: 'block',
        position: 'absolute',
        top: '30%',
        right: '50%',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default LoaderComp
