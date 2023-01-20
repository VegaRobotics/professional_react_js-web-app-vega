import React from 'react';
import * as S from './styles';

import Header from '../../components/Header';
import StopWatch from '../../components/Cronometrer/StopWatch';
import Footer from '../../components/Footer';

function ViewStopWatch() {
    return (
        <S.Container>
            <Header/>
            <StopWatch/>
            <Footer/>
        </S.Container>
    );
}
export default ViewStopWatch;