import React from 'react';
import * as S from './styles';

import Header from '../../components/Header';
import SEngenharia from '../../components/SEngenharia';
import Footer from '../../components/Footer';

function SVEngenharia() {
    return (
        <S.Container>
            <Header/>
            <SEngenharia/>
            <Footer/>
        </S.Container>
    );
}
export default SVEngenharia;