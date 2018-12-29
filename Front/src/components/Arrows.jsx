import React from "react";

const LeftArrow = props => {
  return (
    <div className="back_arrow arrow" onClick={props.prevSlide}>
      <i className="fas fa-arrow-left" />
    </div>
  );
};

const RightArrow = props => {
  return (
    <div className="next_arrow arrow" onClick={props.nextSlide}>
      <i className="fas fa-arrow-right" />
    </div>
  );
};

const Arrows = {
  RightArrow,
  LeftArrow
};
export default Arrows;
