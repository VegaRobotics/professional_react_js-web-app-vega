import React from 'react';
import * as S from './styles';

function LQuotes() {
    return (
        <S.Container>
            <S.Text>
                <h1>Faça uma Cotação</h1>
                <h2>Serviços Ofericidos</h2>
                <h3>Detalhes dos Serviços*</h3>
                <select name="select">
                    <option value="Rocker Arm Welder" selected>Estampos Progressivos</option>
                    <option value="Press Type Welder">Estampo Individuais</option>
                    <option value="Press Type Welder">Máquinas de Solda</option>
                    <option value="Press Type Welder">Máquinas de Montagem</option>
                    <option value="Press Type Welder">Máquinas Especiais</option>
                    <option value="Bench Welder">Dispositivos de Solda Resistência</option>
                    <option value="Seam Welder">Dispositivo de Solda MIG</option>
                    <option value="Butt Welder">Aplicações WEB</option>
                    <option value="Mid-Freq Inverter">Aplicações Mobile</option>
                    <option value="Multi-Spot Welder">Automações de Sistemas</option>
                    <option value="Gun Welder">Integração de Sistemas</option>
                    <option value="Miniature Gun Welder">Integração Robótica</option>
                </select>
            </S.Text>
            <S.Button>
               <button>ORÇAR</button>
            </S.Button>
        </S.Container>
    );
}
export default LQuotes;