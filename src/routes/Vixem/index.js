import React from 'react';
import * as S from './styles';

import Header from '../../components/Header';
import Face from '../../components/Face';
import Footer from '../../components/Footer';

function Vixem() {
  return (
    <S.Container>
        <Header/>
        <Face/>
        <Footer/>
    </S.Container>
  );
}

export default Vixem;