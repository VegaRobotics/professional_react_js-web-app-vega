import React from 'react';
import * as S from './styles';

import Header from '../../components/Header';
import ForcaCorte from '../../components/ForcaCorte';
import Footer from '../../components/Footer';

function ViewForcaCorte() {
    return (
        <S.Container>
            <Header/>
            <ForcaCorte/>
            <Footer/>
        </S.Container>
    );
}
export default ViewForcaCorte;