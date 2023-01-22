import React from 'react';
import * as S from './styles';

import Header from '../../components/Header';
import VisionSystem from '../../components/VisionSystem';
import Footer from '../../components/Footer';

function ViewVisionSystem() {
    return (
        <S.Container>
            <Header/>
            <VisionSystem/>
            <Footer/>
        </S.Container>
    );
}
export default ViewVisionSystem;