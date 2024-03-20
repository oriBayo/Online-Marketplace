import { Outlet, Navigate } from 'react-router-dom'
import { useSelector  } from 'react-redux/es/hooks/useSelector'

const PrivateRoute = () => {
  const {userInfo} = useSelector(state => state.users)
  return userInfo ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace />
  )
}

export default PrivateRoute
