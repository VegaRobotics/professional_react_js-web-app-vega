import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as S from './styles';
import whatsapp from '../../assets/whatsapp.png';
import moment from 'moment';

function Budget() {
  const [message, setMessage] = useState("Estamos Online!");

  useEffect(() => {
    const currentHour = moment().hour();
    const isDuringBusinessHours = currentHour >= 9 && currentHour < 18;
    setMessage(isDuringBusinessHours ? "Estamos Online!" : "Fale Conosco!");
  }, []);


  return (
    <S.Container>
      <S.Text>
        <a
          className="whats"
          href="https://api.whatsapp.com/send/?phone=%2B551151998949&text&type=phone_number&app_absent=0"
          target="_blank"
          rel="noreferrer"
        >
          <h2>{message}</h2>
          <img src={whatsapp} className="whats" alt="whats" />
        </a>
        <p>
          Desenvolvimento e Integração de Soluções de Engenharia, Tecnologia e
          Robótica
        </p>
      </S.Text>
      <S.Button>
        <Link to="/quotes">
          <button>FAÇA UMA COTAÇÃO</button>
        </Link>
      </S.Button>
    </S.Container>
  );
}
export default Budget;