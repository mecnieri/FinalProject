import React from 'react';

const LeftArrow = (props) => {
    return (
        <div className="back_arrow arrow" onClick={props.prevSlide}>
            <i className="fas fa-arrow-left"></i>
        </div>
    )
}

const RightArrow = (props) => {
    return (
        <div className="next_arrow arrow" onClick={props.nextSlide}>
            <i className="fas fa-arrow-right"></i>
        </div>
    )
}

// const Slide = ({image}) => {
//     const styles = {
//         // backgroundImage: `url(${image})`,
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: '50% 50%',
//     }
//     return <div className="slide" style={styles}></div>
// }


const Arrows = {
    RightArrow, LeftArrow,
}
export default Arrows