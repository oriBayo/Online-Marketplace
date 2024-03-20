import { Container, Row, Col } from 'react-bootstrap'
import '../styles/footer.css'

const FooterComp = () => {
  return (
    <footer className='bg-dark py-2'>
      <Container>
        <Row className='my-3'>
          <Col className='text-center'>
            <h4 className=' text-light mb-0 fw-bold'>Copyright&copy;</h4>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default FooterComp
