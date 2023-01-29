/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Slider from 'react-slick';
import { Helmet } from "react-helmet";
import * as S from './styles';
import image1 from '../../assets/1.svg'
import image2 from '../../assets/2.svg'
import image3 from '../../assets/3.svg'
import image4 from '../../assets/4.svg'
import image5 from '../../assets/5.svg'
import image6 from '../../assets/6.svg'
import image7 from '../../assets/7.svg'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BoasPraticasProjetos = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0); // gerenciando o estado atual do slide

  const paragraphs = [
    <img src= {image1} className="image1" alt="image1" width="40%" height="40%"/>, 
    <img src= {image2} className="image1" alt="image1" width="40%" height="40%"/>, 
    <img src= {image3} className="image1" alt="image1" width="40%" height="40%"/>, 
    <img src= {image4} className="image1" alt="image1" width="40%" height="40%"/>, 
    <img src= {image5} className="image1" alt="image1" width="40%" height="40%"/>, 
    <img src= {image6} className="image1" alt="image1" width="40%" height="40%"/>, 
    <img src= {image7} className="image1" alt="image1" width="40%" height="40%"/>, 
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
                <title>5 Boas Práticas para Projetos</title>
                <meta name="description" content="Engenharia Atual" />
                <meta name="keywords" content="engenharia, engenharia atual, como ganhar dinheiro com a engenharia, engenharia século 21, engenharia moderna, sucesso na engenharia, consultoria em engenharia"/>
                <meta name="author" content="Vega Robotics" />
            </Helmet>
            <h1>5 Boas Práticas para Projetos</h1>
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

export default BoasPraticasProjetos;
