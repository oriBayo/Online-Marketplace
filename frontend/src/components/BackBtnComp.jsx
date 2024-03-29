import { Link } from 'react-router-dom'

const BackBtnComp = ({ url }) => {
  return (
    <Link to={url} className='btn btn-sm btn-dark my-2 rounded'>
      Go Back
    </Link>
  )
}

export default BackBtnComp
