import React from 'react';
import * as S from './styles';
import { Link } from 'react-router-dom';

function ListAlgoritmos() {
  return (
    <S.Container>
      <S.Text>
        <h1>Algoritmos</h1>
      </S.Text>
      <S.Buttons>
          <Link to="/pesobruto"><button>Peso Bruto</button></Link>
          <Link to="/forcacorte"><button>Força de Corte</button></Link>
          <Link to="/forcadobra"><button>Força de Dobra</button></Link>
          <Link to="/energyconsumption"><button>Consumo de Energia</button></Link>
          <Link to="/stopWatch"><button>Cronômetro</button></Link>
          <Link to="/vixem"><button>Face Mash</button></Link>
          <Link to="/visionsystem"><button>Vision System</button></Link>
          <Link to="/paint"><button>Paint</button></Link>
      </S.Buttons>
    </S.Container>
  );
}

export default ListAlgoritmos;