import React from 'react';
import * as S from './styles';

import Header from '../../components/Header';
import Engenharia from '../../components/Engenharia';
import Footer from '../../components/Footer';

function VEngenharia() {
    return (
        <S.Container>
            <Header/>
            <Engenharia/>
            <Footer/>
        </S.Container>
    );
}
export default VEngenharia;