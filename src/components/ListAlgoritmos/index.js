import React from 'react';
import * as S from './styles';
import { Link } from 'react-router-dom';

function ListAlgoritmos() {
  return (
    <S.Container>
      <S.Buttons>
          <Link to="/pesobruto"><button>Gross Weight Carbon Steel</button></Link>
          <Link to="/forcacorte"><button>Stamping Force for Low Carbon Steel</button></Link>
          <Link to="/forcadobra"><button>Bending Force</button></Link>
      </S.Buttons>
    </S.Container>
  );
}

export default ListAlgoritmos;