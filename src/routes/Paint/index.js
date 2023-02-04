import React from 'react';
import * as S from './styles';

import Header from '../../components/Header';
import Paint from '../../components/Paint';
import Footer from '../../components/Footer';

function ViewPaint() {
    return (
        <S.Container>
            <Header/>
            <Paint/>
            <Footer/>
        </S.Container>
    );
}
export default ViewPaint;