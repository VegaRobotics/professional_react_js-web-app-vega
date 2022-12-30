import React from 'react';
import * as S from './styles';

function LQuotes() {
    return (
        <S.Container>
            <S.Text>
                <h1>Get A Quote</h1>
                <h2>Machine Details</h2>
                <h3>Machine Type *</h3>
                <select name="select">
                    <option value="Rocker Arm Welder">Rocker Arm Welder</option>
                    <option value="Press Type Welder" selected>Press Type Welder</option>
                    <option value="Bench Welder">Bench Welder</option>
                    <option value="Seam Welder">Seam Welder</option>
                    <option value="Butt Welder">Butt Welder</option>
                    <option value="Mid-Freq Inverter">Mid-Freq Inverter</option>
                    <option value="Multi-Spot Welder">Multi-Spot Welder</option>
                    <option value="Gun Welder">Gun Welder</option>
                    <option value="Miniature Gun Welder">Miniature Gun Welder</option>
                    <option value="Special Application Welder">Special Application Welder</option>
                    <option value="Reconditioned Welder">Reconditioned Welder</option>
                </select>
            </S.Text>
            <S.Button>
               <button>SUBMIT</button>
            </S.Button>
        </S.Container>
    );
}
export default LQuotes;