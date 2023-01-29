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
          <Link to="/boaspraticasprojetos"><button>5 Boas Práticas para Projetos de Estampo</button></Link>
          <Link to="/grabcad"><button>GRABCAD → O que é? Para que serve?</button></Link>
          <Link to="/guiaslineares"><button>Guias Lineares → O que são? Como especifica-las</button></Link>
      </S.Buttons>
    </S.Container>
  );
}

export default ListArtigos;