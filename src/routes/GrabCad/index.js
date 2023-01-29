import React from 'react';
import * as S from './styles';

import Header from '../../components/Header';
import GrabCad from '../../components/GrabCad';
import Footer from '../../components/Footer';

function VGrabCad() {
    return (
        <S.Container>
            <Header/>
            <GrabCad/>
            <Footer/>
        </S.Container>
    );
}
export default VGrabCad;