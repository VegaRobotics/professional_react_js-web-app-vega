import styled from 'styled-components';

export const Container = styled.div`
    /* font-family: Bebas Neue; */
    width: 100%;
    height: 100px;
    background: #161a1e;
    /* border-bottom: 5px solid #891A14; */
    display: flex;
    position: initial;
    z-index: -1;
`
export const Center = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    margin-right: 200px;

    a, button {
    color: #FFFFFF;
    
    font-weight: bold;
    text-decoration: none;
    margin: 0 20px;

&:hover{
    color: #891A14;
    transition: 0.25s;
}
}
`
export const LeftSide = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    padding-left: 25px;
    padding-top: 5px;

    img {
        width: 180px;
        height: 180px;
        &:hover{
        transform: scale(1.05);
        opacity: 20;
        transition: 1s;
    }
    }

    @media (max-width: 580px){
        #logo {
            width: 70%;
            height: auto;
        }
    }
`
export const RightSide = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    img {
        width: 45px;
        padding-top: 0px;
        padding-right: 30px;
        &:hover{
         transform: scale(1.1);
         opacity: 20;
         transition: 1s;
    }

    }

    button {
        background: none;
        border: none;
        cursor: pointer;
    }

    a, button {
        color: #FFF;
        font-weight: bold;
        text-decoration: none;
        margin: 0 10px;

    &:hover{
        transition: opacity .3s;
    }

    span {
        background: #FFF;
        color: #891A14;
        padding: 3px 7px;
        border-radius: 50%50%;
        position: relative;
        top: -20px;
        right: 10px;
    }
    }
`