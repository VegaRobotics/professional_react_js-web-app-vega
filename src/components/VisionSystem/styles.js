import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    @media (max-width: 414px) {
            display: inline;
            /* background-color: green; */
            height: 100%;
            overflow: hidden;
            /* font-size: 20px;
            margin-top: -50px; */
        }
`
export const WebCam = styled.div`
    display: block;
    border: 10px solid transparent;
    margin-bottom: 10px;
    h1 {
        text-align: center;
        color: gray;
        font-weight: none;
        font-size: 1.5em;
        -webkit-animation: fadeinup 2s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadeinup 2s; /* Firefox < 16 */
        -ms-animation: fadeinup 2s; /* Internet Explorer */
        -o-animation: fadeinup 2s; /* Opera < 12.1 */
        animation: fadeinup 2s;
    }
    @media (max-width: 414px) {
            display: column;
            /* background-color: #FFFFFF; */
            /* color: red; */
            padding-left: 40px;
            /* background-color: red; */
            width: 80%;
            /* height: 100%; */
            /* margin-top: 10px; */
            overflow: hidden;
        }
`
export const ImageStorage = styled.div`
    display: block;
    border: 10px solid transparent;
    margin-bottom: 10px;
    h1 {
        text-align: center;
        color: gray;
        font-weight: none;
        font-size: 1.5em;
        -webkit-animation: fadeinup 2s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadeinup 2s; /* Firefox < 16 */
        -ms-animation: fadeinup 2s; /* Internet Explorer */
        -o-animation: fadeinup 2s; /* Opera < 12.1 */
        animation: fadeinup 2s;
    }
    @media (max-width: 414px) {
            display: none;
            /* background-color: #FFFFFF; */
            /* background-color: red; */
            padding-left: 40px;
            width: 80%;
            /* margin-top: 10px; */
            overflow: hidden;
        }
`
export const Range = styled.div`
    display: inline-flex;
    width: 60%;
    input {
        width: 70%;
        color: #6b6b6b;
        font-weight: regular;
        font-size: 1em;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-left: 30px;
        padding-right: 30px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 10px;
    }
    h1 {
        text-align: center;
        color: gray;
        font-weight: none;
        font-size: 1em;
        -webkit-animation: fadeinup 2s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadeinup 2s; /* Firefox < 16 */
        -ms-animation: fadeinup 2s; /* Internet Explorer */
        -o-animation: fadeinup 2s; /* Opera < 12.1 */
        animation: fadeinup 2s;
    }
    @media (max-width: 414px) {
            display: inline;
            background-color: #FFFFFF;
            /* background-color: red; */
            width: 100%;
            /* margin-top: 10px; */
            overflow: hidden;
        }
`

export const Button = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    justify-content: center; 
    padding: 10px;

    button, input {
    margin-bottom: 10px;
    text-align: center;
    color: white;
    background: #F55E34;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 9px;
    padding-bottom: 9px;
    font-weight: regular;
    font-size: 0.8rem;
    text-decoration: none;
    border: none;
    cursor: pointer;
    border-radius: 0.5rem;
    
    &:hover{
        background: white;
        color: black;
        transition: 1s;
    }

    h1 {
        text-align: center;
        color: #2e2e2e;
        font-weight: none;
        font-size: 0.8rem;
        -webkit-animation: fadeinup 2s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadeinup 2s; /* Firefox < 16 */
        -ms-animation: fadeinup 2s; /* Internet Explorer */
        -o-animation: fadeinup 2s; /* Opera < 12.1 */
        animation: fadeinup 2s;
    }
    @media (max-width: 414px) {
            display: column;
            /* background-color: #FFFFFF; */
            /* background-color: red; */
            width: 90%;
            /* margin-top: 10px; */
            overflow: hidden;
        }
}
`

export const Result = styled.div`
    display: flex;
    h1 {
        text-align: center;
        color: #2e2e2e;
        font-weight: none;
        font-size: 1em;
        -webkit-animation: fadeinup 2s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadeinup 2s; /* Firefox < 16 */
        -ms-animation: fadeinup 2s; /* Internet Explorer */
        -o-animation: fadeinup 2s; /* Opera < 12.1 */
        animation: fadeinup 2s;
    }
    @media (max-width: 414px) {
            display: inline;
            background-color: #FFFFFF;
            /* background-color: red; */
            padding-right: 20px;
            width: 100%;
            /* margin-top: 10px; */
            overflow: hidden;
        }
        
`

export const Modal = styled.div`
    .modal {
        z-index: 1;
        background-color: #FFFFFF;
        width: 60%;
        height: 100%;
        border: 5px solid black;
        p{
            text-align: center;
        color: #2e2e2e;
        font-weight: none;
        font-size: 1em;
        -webkit-animation: fadeinup 2s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadeinup 2s; /* Firefox < 16 */
        -ms-animation: fadeinup 2s; /* Internet Explorer */
        -o-animation: fadeinup 2s; /* Opera < 12.1 */
        animation: fadeinup 2s;  
        @media (max-width: 414px) {
            display: column;
            background-color: #FFFFFF;
            /* background-color: red; */
            width: 80%;
            /* margin-top: 10px; */
            overflow: hidden;
        }
        }
    }
    
`