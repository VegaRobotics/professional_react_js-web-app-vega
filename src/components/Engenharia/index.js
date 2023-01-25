/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Slider from 'react-slick';
import { Helmet } from "react-helmet";
import * as S from './styles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Engenharia = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0); // gerenciando o estado atual do slide

  const paragraphs = [
    'A tecnologia tem desempenhado um papel fundamental na área de engenharia, permitindo aos engenheiros desenvolver projetos mais precisos e eficientes. Atualmente, existem diversas ferramentas tecnológicas disponíveis que podem ser utilizadas para melhorar os processos de engenharia, tais como modelagem 3D, simulação, inteligência artificial e robótica.',
    'A modelagem 3D, por exemplo, permite aos engenheiros visualizar projetos em detalhes antes de construí-los, o que pode ajudar a identificar erros e problemas potenciais antes que eles ocorram. A simulação também é uma ferramenta valiosa, pois permite testar diferentes cenários e condições sem precisar construir fisicamente o projeto.',
    'A inteligência artificial e a robótica também estão se tornando cada vez mais populares na área de engenharia, pois podem automatizar tarefas repetitivas e perigosas, além de aumentar a precisão e eficiência dos projetos.',
    'No entanto, para aproveitar essas tecnologias é necessário investir em pesquisa e desenvolvimento, além de treinar os engenheiros para utilizá-las corretamente. O investimento em tecnologia pode parecer caro no curto prazo, mas no longo prazo, pode trazer benefícios significativos, como aumento de lucratividade, redução de custos e aumento da eficiência.',
    'Em resumo, a tecnologia tem um papel importante na área de engenharia e investir nela é fundamental para melhorar os processos e aumentar a lucratividade. As ferramentas tecnológicas, como modelagem 3D, simulação, inteligência artificial e robótica, são alguns exemplos de como a tecnologia pode ser utilizada para melhorar a eficiência e precisão dos projetos.',
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
                <title>Engenharia Moderna</title>
                <meta name="description" content="Engenharia Atual" />
                <meta name="keywords" content="engenharia, engenharia atual, como ganhar dinheiro com a engenharia, engenharia século 21, engenharia moderna, sucesso na engenharia, consultoria em engenharia"/>
                <meta name="author" content="Vega Robotics" />
            </Helmet>
            <h1>Engenharia no Cenário Atual</h1>
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

export default Engenharia;
