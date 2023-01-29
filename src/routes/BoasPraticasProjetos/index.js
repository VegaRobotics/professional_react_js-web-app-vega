import React from 'react';
import * as S from './styles';

import Header from '../../components/Header';
import BoasPraticasProjetos from '../../components/BoasPraticasProjetos';
import Footer from '../../components/Footer';

function VBoasPraticasProjetos() {
    return (
        <S.Container>
            <Header/>
            <BoasPraticasProjetos/>
            <Footer/>
        </S.Container>
    );
}
export default VBoasPraticasProjetos;