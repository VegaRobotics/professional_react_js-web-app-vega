import styled from 'styled-components';

export const Container = styled.div`
    /* font-family: Bebas Neue; */
    width: 100%;
    height: 100px;
    background: white;
    /* border-bottom: 5px solid #891A14; */
    display: flex;
    /* position: initial; */
    z-index: -1;
    font-size: 15px;
    padding-bottom: 550px;
    flex-direction: row;

    @media (max-width: 414px) {
        width: 100%;
        overflow: hidden
        /* flex-direction: column; */
        /* background-color: red; */
    }
`

export const Tasks = styled.div`
    width: 100%;
    height: 100%;
    /* display: flex; */
    padding-left: 10px;
    padding-right: 10px;
    /* flex-direction: column; */


`