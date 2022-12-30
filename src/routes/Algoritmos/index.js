import React from 'react';
import * as S from './styles';

import Header from '../../components/Header';
import ListAlgoritmos from '../../components/ListAlgoritmos';
import Footer from '../../components/Footer';

function Algoritmos() {
    return (
        <S.Container>
            <Header/>
            <ListAlgoritmos/>
            <Footer/>
        </S.Container>
    );
}
export default Algoritmos;