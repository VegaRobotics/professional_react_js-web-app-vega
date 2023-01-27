import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,1)), url(https://images.pexels.com/photos/12876612/pexels-photo-12876612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
    background-size: 100%;
    background-position: bottom right;
    /* transform: scaleX(-1); */
    flex-direction: column;
    justify-content: center;    
    h1 {
        color: #2e2e2e;
        margin-left: 30px;
        margin-top: 30px;
        font-weight: regular;
        font-size: 1.8em;
        text-decoration: none;
}
`;

export const Calc = styled.div`
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 0.15rem;
    padding-left: 2rem;
    padding-bottom: 3rem; 


label {
    color: #2e2e2e;
    font-weight: regular;
    font-size: 1.15em;
    text-decoration: none;
    padding-top: 0.5rem;
    padding-bottom: 0.25rem;
}
span {
    padding-top: 1rem;
    color: #2e2e2e;
    font-weight: bold;
    font-size: 1.25em;
    text-decoration: none;
}
input {
    width: 50%;
    color: #2e2e2e;
    font-weight: regular;
    text-decoration: none;
    font-size: 1.15em;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}
`

export const Img = styled.div`
    display: flex;
    peso {
    height: 10%;
}
`