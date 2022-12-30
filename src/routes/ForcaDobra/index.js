import React from 'react';
import * as S from './styles';

import Header from '../../components/Header';
import ForcaDobra from '../../components/ForcaDobra';
import Footer from '../../components/Footer';

function ViewForcaDobra() {
    return (
        <S.Container>
            <Header/>
            <ForcaDobra/>
            <Footer/>
        </S.Container>
    );
}
export default ViewForcaDobra;