import React from 'react';
import * as S from './styles';
import { Link } from 'react-router-dom';

function ListAlgoritmos() {
  return (
    <S.Container>
      <S.Buttons>
          <Link to="/pesobruto"><button>Calculadora de Peso Bruto</button></Link>
          <Link to="/forcacorte"><button>Calculadora de Força de Corte</button></Link>
          <Link to="/forcadobra"><button>Calculadora de Força de Dobra</button></Link>
      </S.Buttons>
    </S.Container>
  );
}

export default ListAlgoritmos;