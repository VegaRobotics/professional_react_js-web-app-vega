import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background: white;
    flex-direction: column;
    justify-content: center;
`;

export const Text = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 1rem;
    padding-left: 2rem;
    padding-bottom: 1.5rem;
select {
    width: 50%;
    color: #6b6b6b;
    font-weight: regular;
    font-size: 1em;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 10px;
}
p {
    color: #FFFFFF99;
    font-weight: regular;
    text-decoration: none;
    }
a {
    color: white;
    font-weight: none;
    font-size: 1.1em;
    line-height: 0;
    text-decoration: none;
    }
h1 {
    color: #2e2e2e;
    font-weight: none;
    font-size: 3.8em;
    line-height: 0;
    text-decoration: none;
    }
h2 {
    color: #2e2e2e;
    font-weight: none;
    font-size: 2em;
    line-height: 0;
    text-decoration: none;
    }
h3 {
    color: #6b6b6b;
    font-weight: bold;
    font-size: 1em;
    line-height: 0;
    text-decoration: none;
    }
`;

export const Button = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 0.01em;
    padding-left: 2rem;
    padding-bottom: 1rem;
    display: flex;
    justify-content: flex-start;  
button {
    color: white;
    background: #F55E34;
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 19px;
    padding-bottom: 19px;
    font-weight: regular;
    font-size: 1.25rem;
    text-decoration:none;
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