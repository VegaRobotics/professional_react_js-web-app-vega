import React from 'react';
import * as S from './styles';

import Header from '../../components/Header';
import PesoBruto from '../../components/PesoBruto';
import Footer from '../../components/Footer';

function ViewPesoBruto() {
    return (
        <S.Container>
            <Header/>
            <PesoBruto/>
            <Footer/>
        </S.Container>
    );
}
export default ViewPesoBruto;