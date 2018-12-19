import React from 'react';
import { Slide } from 'react-slideshow-image';
import img1 from '../images/prod1.png';
import img2 from '../images/prod2.png';
import img3 from '../images/prod3.jpg';



const properties = {
  duration: 3000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  autoplay: true
}

const Slideshow = () => {
  return (
    <Slide {...properties}>
      <div className="each-slide">
        <img src={img1} alt="img1" width="600" height="400" />
        <p>New Mobiles</p>
      </div>
      <div className="each-slide">
        <img src={img2} alt="img2" width="500" height="400" />
        <span>Slide 2</span>
      </div>
      <div className="each-slide">
        <img src={img3} alt="img3" width="500" height="400" />
        <span>Slide 3</span>
      </div>
    </Slide>
  )
}

export default Slideshow;