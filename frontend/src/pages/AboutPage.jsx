import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import { aboutUsContent } from '../constants/stringConstant.js'
import aboutImg from '../asserts/management_team.jpg'

const AboutPage = () => {
  return (
    <section id='about' className='my-4'>
      <Container>
        <Row>
          <Col className='col-10 mx-auto col-md-6 my-5'>
            <h1 className='text-capitalize'>
              about <strong className='banner-title'>us</strong>
            </h1>

            <p className='w-75 my-4 text-muted'>{aboutUsContent}</p>
            <Button variant='outline-dark' className='text-uppercase'>
              explore
            </Button>
          </Col>

          <Col className='col-md-6 mx-auto my-5 align-self-center d-none d-md-block'>
            <div className='about-img__container'>
              <Image
                src={aboutImg}
                className='img-fluid'
                alt='management_team'
              ></Image>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AboutPage
