import styled from 'styled-components';

export const Container= styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 15vmin;
    background: #161a1e;
    /* bottom: 5px; */
    align-items: center;
    @media (max-width: 414px) {
        height: 100px;
        /* background-color: red; */
        flex-direction: column;
        /* margin-bottom: 30px; */
        /* padding-bottom: 30px; */
    }  
  

    span{
        color: gray;
        font-weight: lighter;
        margin-top: 25px;
       
        @media (max-width: 414px) {
            /* background-color: red; */
            margin-right: 10px;
            /* margin-bottom: -10px; */
        }
    }
    
    footer{
        color: gray;
        font-size: 12px;
        font-weight: lighter;
        margin-top: -5px;
        text-align: center;
        @media (max-width: 414px) {
            height: 100%;
            flex-direction: column;
            /* background-color: red; */
        /* flex-direction: column; */
        /* margin-bottom: 30px; */
        /* padding-bottom: 30px; */
    }
        /* padding-bottom: 10px; */
    }
    

    /* @media only screen and (max-width: 414px) {
        height: 25vmin;
    } */
`
export const Center = styled.div`
    display: row;
    align-items: center;
    width: 10%;
    margin-bottom: 10vmin;
    pointer-events: none;
    background: #161a1e;
    border-radius: 100px;
    @media (max-width: 414px) {
            height: 100%;
            width: 100px;
            flex-direction: column;
            /* background-color: red; */
            /* padding: 29px; */
        /* flex-direction: column; */
        /* margin-bottom: 30px; */
        /* padding-bottom: 30px; */
    }
    @media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 10s linear;
  }
  @keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
}

    /* @media only screen and (max-width: 414px) {
        width: 20%;
        margin-bottom: 15vmin;
    } */
`

export const LeftSide = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 20px;

    img {
        width: 30px;
        padding: 10px;
        /* height: 80px; */
        @media (max-width: 414px) {
            height: 100%;
            width: 40px;
            flex-direction: column;
            /* background-color: red; */
            padding: 29px;
        /* flex-direction: column; */
        /* margin-bottom: 30px; */
        /* padding-bottom: 30px; */
    }
        &:hover{
            transform: scale(1.1);
            opacity: 20;
            transition: 1s;
        }
    }

    /* @media only screen and (max-width: 414px) {
        height: 50px;
        background-color: red;
        flex-direction: column;
        margin-right: 90px;
        margin-top: -60px;
    } */
`

export const RightSide = styled.div`
    width: 100%;
    /* height: 50px; */
    /* display: inline; */
    /* background-color: white; */
    /* justify-content: row; */
    text-align: right;
    align-content: space-evenly;
    padding-right: 20px;

    img {
        width: 80px;
        height: 80px;
        
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
    }

    a, button {
        color: gray;
        font-weight: lighter;
        text-decoration: none;
        margin-top: 25px;
        margin-right: 10px;

        &:hover{
            color: #FFFFFF;
            transition: 0.25s

}

span {
    background: #FFF;
    color: #891A14;
    padding: 3px 7px;
    border-radius: 50%50%;
    position: relative;
    top: -25px;
    right: 10px;
}
}
`