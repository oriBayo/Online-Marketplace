import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const ErrorPage = () => {
  return (
    <Container style={{ minHeight: '100vh' }}>
      <Row style={{ minHeight: '50vh' }}>
        <Col className='d-flex justify-content-center align-items-center'>
          <div className='display-3 '>Page Not Found</div>
        </Col>
      </Row>
    </Container>
  )
}

export default ErrorPage
