import React from 'react';
import * as S from './styles';

import Header from '../../components/Header';
import GuiasLineares from '../../components/GuiasLineares';
import Footer from '../../components/Footer';

function VGuiasLineares() {
    return (
        <S.Container>
            <Header/>
            <GuiasLineares/>
            <Footer/>
        </S.Container>
    );
}
export default VGuiasLineares;