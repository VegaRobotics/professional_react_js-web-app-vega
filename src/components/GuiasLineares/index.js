/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Slider from 'react-slick';
import { Helmet } from "react-helmet";
import * as S from './styles';
import image40 from '../../assets/40.svg'
import image41 from '../../assets/41.svg'
import image42 from '../../assets/42.svg'
import image43 from '../../assets/43.svg'
import image44 from '../../assets/44.svg'
// import image45 from '../../assets/45.svg'
import image46 from '../../assets/46.svg'
import image47 from '../../assets/47.svg'
import image48 from '../../assets/48.svg'
import image49 from '../../assets/49.svg'
import image50 from '../../assets/50.svg'
import image51 from '../../assets/51.svg'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const GuiasLineares = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0); // gerenciando o estado atual do slide

  const paragraphs = [
    <img src= {image40} className="image1" alt="image1" width="40%" height="40%"/>, 
    <img src= {image41} className="image1" alt="image1" width="40%" height="40%"/>, 
    <img src= {image42} className="image1" alt="image1" width="40%" height="40%"/>, 
    <img src= {image43} className="image1" alt="image1" width="40%" height="40%"/>, 
    <img src= {image44} className="image1" alt="image1" width="40%" height="40%"/>, 
    // <img src= {image45} className="image1" alt="image1" width="40%" height="40%"/>, 
    <img src= {image46} className="image1" alt="image1" width="40%" height="40%"/>, 
    <img src= {image47} className="image1" alt="image1" width="40%" height="40%"/>, 
    <img src= {image48} className="image1" alt="image1" width="40%" height="40%"/>, 
    <img src= {image49} className="image1" alt="image1" width="40%" height="40%"/>, 
    <img src= {image50} className="image1" alt="image1" width="40%" height="40%"/>, 
    <img src= {image51} className="image1" alt="image1" width="40%" height="40%"/>, 
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: currentSlide => setCurrentSlide(currentSlide),
    prevArrow: <S.Container prevArrow />, // adicionando a prop prevArrow para o componente container
    nextArrow: <S.Container nextArrow />, // adicionando a prop nextArrow para o componente container
  };

  return (
    <S.Container>
            <Helmet>
                <title>Guias Lineares → O que são e como especificar</title>
                <meta name="description" content="Engenharia Atual" />
                <meta name="keywords" content="engenharia, engenharia atual, como ganhar dinheiro com a engenharia, engenharia século 21, engenharia moderna, sucesso na engenharia, consultoria em engenharia"/>
                <meta name="author" content="Vega Robotics" />
            </Helmet>
            <h1>Guias Lineares → O que são e como especificars</h1>
      <Slider {...settings}>
        {paragraphs.map((paragraph, index) => (
          <div key={index}>
            <p>{paragraph}</p>
          </div>
        ))}
      </Slider>
    </S.Container>
  );
};

export default GuiasLineares;
