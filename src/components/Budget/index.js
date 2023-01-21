import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './styles';
import whatsapp from '../../assets/whatsapp.png';

function Budget() {
    return (
        <S.Container>
            <S.Text>
               {/* <h2>Contate um atendente agora mesmo</h2> */}
                <a className="whats" href="https://api.whatsapp.com/send/?phone=%2B551151998949&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" >
                <h2>Estamos Online!</h2>
                <img src={whatsapp} className="whats" alt="whats" />
                </a>
               <p>Desenvolvimento e Integração de Soluções de Engenharia, Tecnologia e Robótica</p>
            </S.Text>
            <S.Button>
               <Link to="/quotes"><button>FAÇA UMA COTAÇÃO</button></Link>
            </S.Button>
        </S.Container>
    );
}
export default Budget;

