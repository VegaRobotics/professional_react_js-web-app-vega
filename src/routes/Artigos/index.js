import React from 'react';
import * as S from './styles';

import Header from '../../components/Header';
import ListArtigos from '../../components/ListArtigos';
import Footer from '../../components/Footer';

function Artigos() {
    return (
        <S.Container>
            <Header/>
            <ListArtigos/>
            <Footer/>
        </S.Container>
    );
}
export default Artigos;