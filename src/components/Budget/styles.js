import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    background-image: url(https://seedorffacme.com/wp-content/themes/seedorff/images/footer-bg.jpg);
`;
export const Text = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 5rem;
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
h2 {
    color: white;
    font-weight: none;
    font-size: 2.2em;
    line-height: 0;
    text-decoration: none;
    }
`;

export const Button = styled.div`
    width: 23rem;
    height: 100%;
    padding-top: 3rem;
    padding-right: 7rem;
    display: flex;
    justify-content: flex-end;  
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