import React, { Component } from 'react';
import Arrows from './Arrows';



class Slider extends Component {
  constructor(props){
    super(props)

    this.state = {
      images: [
        './images/prod1.png',
        './images/prod2.png',
        './images/prod3.jpg',
        'https://placekitten.com/500/503',
        
      ],
      currentSlide: 0,
      translateValue: 0,
      // automaticMove:true
    }

  }
  
  prevSlide = () => {
    if( this.state.currentSlide === 0 ) return;
    const containerWidth = document.querySelector('.slider').clientWidth;
    this.setState( prevState => {
      return {
        currentSlide: prevState.currentSlide - 1,
        translateValue: prevState.translateValue  + containerWidth,
      }
    })
  }
  nextSlide = () => {
    if( (this.state.images.length - 1 )  === this.state.currentSlide ){
      return;
    }
    const containerWidth= document.querySelector('.slider').clientWidth;
    this.setState(  (nextState ) => {
      return {
        currentSlide: nextState.currentSlide + 1,
        translateValue: nextState.translateValue-containerWidth,
      }
    })

  }
  // automaticMovement=()=>{
  //   const containerWidth= document.querySelector('.slider').clientWidth;
  //   this.setState({
  //     translateValue: this.state.translateValue-containerWidth,
  //   })
  //   return (
  //     <div className="slider">
  //     <div className="slider_container"
  //         style={{
  //           transform: `translateX(${this.state.translateValue}px)`,
  //           transition: 'transform linear 0.5s',
  //           width: `${100}%`
  //         }}>
  //         {
  //           this.createImages()
  //         }
  //     </div>
  //     </div>
  //   )
  // }

  createImages=()=>{
    let imageArray=[];
    for(let i=0;i<this.state.images.length;i++){
      imageArray.push(<div style={{width: `${100}%`,display:'inline-block'}} key={i}><img src={this.state.images[i]} 
      style={{width: `${50}%`, display:'flex', margin:'auto'}}key={i} alt="slider_image"/></div>)
    }
    return imageArray;
  }
  
  render() {
    // if(this.state.automaticMove){
    //   //setInterval(function(){
    //     this.automaticMovement()
   
      
    // }
    return (
      <div className="slider">
          <div className="slider_container"
          style={{
            transform: `translateX(${this.state.translateValue}px)`,
            transition: 'transform linear 0.5s',
            width: `${100}%`
          }}>
          {
            this.createImages()
          }
          </div>
        <Arrows.LeftArrow prevSlide={this.prevSlide} />
        <Arrows.RightArrow nextSlide={this.nextSlide}/>

      </div>
    );
  }
}




export default Slider;