import styled from 'styled-components';

export const Container = styled.div`
position: relative;
display: flex;
width: 100%;
height: 100%;
background-image: url(https://seedorffacme.com/wp-content/themes/seedorff/images/footer-bg.jpg);
@media (max-width: 768px) {
    flex-direction: column;
    height: auto;
}
`;

export const Text = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
/* justify-content: space-between; */
padding-top: 30px;
padding-bottom: 30px;
padding-left: 5rem;
p {
    color: #FFFFFF99;
    font-weight: regular;
    text-decoration: none;
}

img {   
    padding-top: 9px;
    width: 35px;
    height: 35px;
}

a.whats {
    animation: pulse 0.7s infinite;
    margin: 0 auto;
    display: flex;
    margin-left: 0px;
    text-decoration: none;
    /* margin-top: 50px; */
    cursor: pointer;
    animation-direction: alternate;
    /* &:hover{
        border-radius: 40px;
        background: red;
        color: black;
        transition: 1s;
    } */
    -webkit-animation-name: pulse;
    animation-name: pulse;
}
@-webkit-keyframes pulse {
    0% {
        -webkit-transform: scale(1);
        -webkit-filter: brightness(100%);
    }
    100% {
        -webkit-transform: scale(1.05);
        -webkit-filter: brightness(100%);
    }
}
@keyframes pulse {
    0% {
        transform: scale(1);
        filter: brightness(100%);
    }
    100% {
        transform: scale(1.05);
        filter: brightness(100%);
    }
}

h2 {
    color: white;
    font-weight: none;
    font-size: 2.2em;
    line-height: 0;
    text-decoration: none;
    margin-right: 10px;

    @media (max-width: 768px) {
        font-size: 1.5em;
        text-align: center;
    }
}
`;

export const Button = styled.div`
width: 23rem;
height: 100%;
padding-top: 3rem;
padding-right: 7rem;
display: flex;
justify-content: flex-end;
@media (max-width: 768px) {
    width: 100%;
    padding-right: 0;
    justify-content: center;
}
    button, Link {
    color: white;
    background: #F55E34;
    padding-left: 20px;
    padding-right: 20px;
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

       
