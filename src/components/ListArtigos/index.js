import React from 'react';
import * as S from './styles';
import { Link } from 'react-router-dom';

function ListArtigos() {
  return (
    <S.Container>
      <S.Text>
        <h1>Artigos</h1>
      </S.Text>
      <S.Buttons>
          <Link to="/engenharia"><button>Engenharia Atual</button></Link>
      </S.Buttons>
    </S.Container>
  );
}

export default ListArtigos;