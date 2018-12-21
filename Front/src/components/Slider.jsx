import React from 'react';
import { Slide } from 'react-slideshow-image';
import img2 from '../images/slides/2.png';
import img3 from '../images/slides/3.png';
import img6 from '../images/slides/6.png';
import img9 from '../images/slides/9.png';
import img10 from '../images/slides/10.png';
import img11 from '../images/slides/11.png';



const properties = {
  duration: 3000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: false,
  autoplay: true
}



const Slideshow = () => {
  return (
    localStorage.removeItem("Authorized"),
    localStorage.removeItem("Registered"),
    <Slide {...properties}>
      <div className="each-slide">
        <img src={img2} alt="img2" width="500" height="400" />
      </div>
      <div className="each-slide">
        <img src={img3} alt="img3" width="500" height="400" />
      </div>
      <div className="each-slide">
        <img src={img6} alt="img8" width="600" height="400" />
      </div>
      <div className="each-slide">
        <img src={img9} alt="img8" width="600" height="400" />
      </div>
      <div className="each-slide">
        <img src={img10} alt="img8" width="600" height="400" />
      </div>
      <div className="each-slide">
        <img src={img11} alt="img8" width="600" height="400" />
      </div>
    </Slide>
  )
}

export default Slideshow;