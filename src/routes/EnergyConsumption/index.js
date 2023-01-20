import React from 'react';
import * as S from './styles';

import Header from '../../components/Header';
import EnergyConsumption from '../../components/EnergyConsumption';
import Footer from '../../components/Footer';

function ViewEnergyConsumption() {
    return (
        <S.Container>
            <Header/>
            <EnergyConsumption/>
            <Footer/>
        </S.Container>
    );
}
export default ViewEnergyConsumption;