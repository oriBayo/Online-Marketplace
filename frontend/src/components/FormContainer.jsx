import { Container, Row, Col, Button, Card } from 'react-bootstrap'

const FormContainer = ({ children, title, withLogos }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xl={5} lg={6} md={8} sm={12}>
          <CustomCard children={children} title={title} withLogos={withLogos} />
        </Col>
      </Row>
    </Container>
  )
}

const CustomCard = ({ children, title, withLogos }) => {
  return (
    <Card className='p-3 m-5 loginCard '>
      <Card.Title>
        <h1 className='title text-center m-3 border-bottom'>{title}</h1>
      </Card.Title>
      {children}

      {withLogos && <Logos />}
    </Card>
  )
}

const logos = ['fa-facebook', 'fa-twitter', 'fa-instagram', 'fa-google-plus']

const Logos = () => {
  return (
    <Row>
      <Col className='text-center p-4 '>
        {logos.map((logo) => (
          <Button key={logo} className='btn btn-link'>
            <i className={`fa-brands ${logo} fa-3x text-info`}></i>
          </Button>
        ))}
      </Col>
    </Row>
  )
}

export default FormContainer
