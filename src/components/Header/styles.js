import styled from 'styled-components';

export const Container = styled.div`
    /* font-family: Bebas Neue; */
    width: 100%;
    height: 100px;
    background: #161a1e;
    /* border-bottom: 5px solid #891A14; */
    display: flex;
    /* position: fixed; */
`



export const Center = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    margin-left: 0px;

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
        width: 50px;
        padding-top: 0px;
        padding-right: 20px;

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