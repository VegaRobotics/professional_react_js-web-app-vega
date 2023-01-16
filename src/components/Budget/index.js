import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './styles';

function Budget() {
    return (
        <S.Container>
            <S.Text>
               <h2>Contate o Departamento de Vendas agora mesmo!</h2>
               <p>Desenvolvimento e Integração de Soluções de Engenharia, Tecnologia e Robótica</p>
            </S.Text>
            <S.Button>
               <Link to="/quotes"><button>FAÇA UMA COTAÇÃO</button></Link>
            </S.Button>
        </S.Container>
    );
}
export default Budget;

