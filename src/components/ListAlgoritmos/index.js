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
          <Link to="/energyconsumption"><button>Calculadora Consumo de Energia</button></Link>
          <Link to="/stopWatch"><button>Cronometro</button></Link>
      </S.Buttons>
    </S.Container>
  );
}

export default ListAlgoritmos;