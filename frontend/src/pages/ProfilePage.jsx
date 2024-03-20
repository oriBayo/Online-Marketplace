import { Row, Col, Card } from 'react-bootstrap'

import ProfileFormComp from '../components/ProfileFormComp'
import ProfileTableOrdersComp from '../components/ProfileTableOrdersComp'

const ProfilePage = () => {
  return (
    <Row>
      <Col md={3}>
        <h1 className='mb-2 text-center'>Profile</h1>

        <ProfileFormComp />
      </Col>
      <Col md={9}>
        <h1 className='mb-2 text-center'>Orders</h1>
        <Card>
          <Card.Body className='mb-2 '>
            <ProfileTableOrdersComp />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default ProfilePage
