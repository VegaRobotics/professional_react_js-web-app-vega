import React from 'react';
import * as S from './styles';

import Header from '../../components/Header';
import CapturEmail from '../../components/CapturEmail';
import Footer from '../../components/Footer';

function ViewCapturEmail() {
    return (
        <S.Container>
            <Header/>
            <CapturEmail/>
            <Footer/>
        </S.Container>
    );
}
export default ViewCapturEmail;