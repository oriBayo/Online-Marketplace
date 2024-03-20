import BannerPage from '../pages/BannerPage'
import AboutPage from '../pages/AboutPage'
import {
  ScrollContainer,
  ScrollPage,
  Animator,
  MoveIn,
} from 'react-scroll-motion'
const HomePage = () => {
  return (
    <>
      <ScrollContainer>
        <ScrollPage>
          <Animator>
            <BannerPage />
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <Animator animation={MoveIn(-300)}>
            <AboutPage />
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </>
  )
}

export default HomePage
