import styled from 'styled-components';

export const Container = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    background: #FFFF;
    padding-bottom: 50px;
    padding-top: 10px;
`
export const Text = styled.div`
    h1 {
        color: #2e2e2e;
        font-weight: none;
        font-size: 1.8em;
        line-height: 0;
        text-decoration: none;
        margin-top: 40px;
        margin-right: 30px;
        margin-left: 30px;
        margin-bottom: 30px;
    }
`

export const Buttons = styled.div`
    width: 100%;
    height: 100%;
    button, link {
        margin-bottom: 30px;
        justify-content: center; 
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 30px;
        margin-right: 30px;
        color: white;
        background: #F55E34;
        padding-left: 32px;
        padding-right: 32px;
        padding-top: 19px;
        padding-bottom: 19px;
        font-weight: regular;
        font-size: 1.25rem;
        text-decoration: none;
        border: none;
        cursor: pointer;
        border-radius: 0.5rem;
        
        &:hover{
            background: white;
            color: black;
            transition: 1s;
            
        }
    }
`;
