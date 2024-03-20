import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.users)
  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to='/' replace />
}

export default AdminRoute
