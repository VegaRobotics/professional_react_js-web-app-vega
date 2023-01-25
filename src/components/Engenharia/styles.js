import styled, { css } from 'styled-components';

export const Container = styled.div`
    background-color: #FFFFFF;
    font-family: Arial, Helvetica, sans-serif; /* fonte padrão */
    font-size: 16px; /* tamanho da fonte */
    line-height: 1.5; /* altura da linha */
    width: 80%; /* largura do artigo */
    margin: 0 auto; /* centralizar o artigo na tela */
    /* padding-left: 30px;
    padding-right: 30px; */ 
    padding-bottom: 55px;
    /* margin-bottom: 50px; */

    h1 {
        font-weight: bold;
        text-align: center; /*Alinha o texto no centro*/
    }
    p {
        margin-bottom: 1em; /* espaço entre os parágrafos */
    }
    img {
        max-width: 100%; /* redimensionar imagens para não ultrapassar a largura do artigo */
        margin: 1em auto; /* centralizar as imagens */
    }
    a {
        color: blue; /* cor padrão dos links */
        text-decoration: none; /* remover a sublinhado */
    }
    ${props => props.prevArrow && css`
        &::before {
            content: "";
            width: 20px;
            height: 20px;
            background-color: #891A14;
            color: black;
            font-size: 10px;
            line-height: 40px;
            text-align: center;
            border-radius: 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
            right: 10px;
            display: block;
        }
    `}
    ${props => props.nextArrow && css`
        &::after {
            content: "";
            width: 20px;
            height: 20px;
            background-color: #891A14;
            color: black;
            font-size: 10px;
            line-height: 40px;
            text-align: center;
            border-radius: 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: -999;
            left: 0px;
            display: block;
        }
    `}
`;
