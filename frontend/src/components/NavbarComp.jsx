import { Container, Nav, Navbar, NavDropdown, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import '../styles/navbar.css'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/userSlice'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../features/usersApiSlice'
import SearchComp from './SearchComp'

const NavbarComp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.users)
  const [logoutApiCall] = useLogoutMutation()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const numOfProductInCart = cartItems.reduce((sum, val) => val.qty + sum, 0)

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className='navbar-container'>
      <Navbar
        key={'lg'}
        expand={'lg'}
        className='bg-body-tertiary '
        sticky='top'
      >
        <Container fluid>
          <Navbar.Brand className='logo'>Online Marketplace</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement='end'
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='justify-content-end flex-grow-1 pe-3 align-items-center '>
                <SearchComp />
                <LinkContainer className='navbar-expand-links' to='/'>
                  <Nav.Link>
                    <i className='fa-solid fa-house me-1'></i>Home
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to='/products'>
                  <Nav.Link className='navbar-expand-links'>
                    <i className='fa-solid fa-store'></i> Store
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to='/cart'>
                  <Nav.Link className='d-flex align-items-center'>
                    <i className='fa-solid fa-cart-shopping'></i> Cart
                    {numOfProductInCart > 0 && (
                      <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                        {numOfProductInCart}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown
                    className='ms-3 '
                    title={userInfo.name}
                    id='username'
                  >
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <i className='fa-solid fa-user me-1'></i>
                      Login
                    </Nav.Link>
                  </LinkContainer>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='adminmenue'>
                    <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item>products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavbarComp
