import { Container } from 'react-bootstrap'
import FooterComp from './components/FooterComp'
import NavbarComp from './components/NavbarComp'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ToastContainer />
      <NavbarComp />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <FooterComp />
    </>
  )
}

export default App
