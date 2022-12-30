import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100px;
    background: #FFFF;
    padding-top: 3rem;
    padding-bottom: 3rem;
`
export const Buttons = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between; 
    padding-top: 1rem;
    padding-left: 2rem; 
    padding-right: 2rem;   
    padding-bottom: 3rem;
    
button, link {
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
