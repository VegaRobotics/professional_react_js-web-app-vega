import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './styles';

function Budget() {
    return (
        <S.Container>
            <S.Text>
               <h2>To Order Contact Sales At 
                <a href="tel:+55 11 5199-8949"> +55 11 5199-8949</a></h2>
               <p>Financing, Lease, and Rental Programs Avaible for All Standard Machines</p>
            </S.Text>
            <S.Button>
               <Link to="/quotes"><button>GET A QUOTE</button></Link>
            </S.Button>
        </S.Container>
    );
}
export default Budget;

