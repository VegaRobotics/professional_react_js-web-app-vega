import React from 'react';
import * as S from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LQuotes from '../../components/LQuotes';

function Quotes() {
  return (
    <S.Container>
        <Header/>
        <LQuotes/>
        <Footer/>
    </S.Container>
  );
}
export default Quotes;