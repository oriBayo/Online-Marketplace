import { useState } from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap'
import CountUp from 'react-countup'
import ScrollTrigger from 'react-scroll-trigger'

const BannerPage = () => {
  const [trigger, setTrigger] = useState(true)
  return (
    <section className='my-4 homePage '>
      <Container fluid>
        <Row className='max-height justify-content-center align-items-center'>
          <Col className='col-10 mx-auto banner text-center'>
            <h1 className='text-capitalize text-light m-4'>
              welcome to
              <strong className='banner-title'> Online Marketplace2</strong>
            </h1>
            <Button variant='outline-secondary' className='w-25 mb-5 mt-3'>
              explore
            </Button>
            <Row className='mx-auto w-50'>
              <Col xl={4}>
                <ScrollTrigger
                  onEnter={() => setTrigger(true)}
                  onExit={() => setTrigger(false)}
                >
                  <div className='display-5 countup'>
                    {trigger && <CountUp start={8800} end={9000} suffix='+' />}
                  </div>
                </ScrollTrigger>

                <div>Premium Products</div>
              </Col>
              <Col xl={4}>
                <ScrollTrigger
                  onEnter={() => setTrigger(true)}
                  onExit={() => setTrigger(false)}
                >
                  <div className='display-5 countup'>
                    {trigger && (
                      <CountUp start={14800} end={15000} suffix='+' />
                    )}
                  </div>
                </ScrollTrigger>
                <div>Happy Customers</div>
              </Col>
              <Col xl={4}>
                <ScrollTrigger
                  onEnter={() => setTrigger(true)}
                  onExit={() => setTrigger(false)}
                >
                  <div className='display-5 countup'>
                    {trigger && <CountUp start={150} end={200} suffix='+' />}
                  </div>
                </ScrollTrigger>
                <div>Shops</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default BannerPage
