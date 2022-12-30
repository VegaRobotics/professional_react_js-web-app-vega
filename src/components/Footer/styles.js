import styled from 'styled-components';

export const Container= styled.div`
    display: flex;
    width: 100%;
    height: 5vmin;
    background: #161a1e;

    position: bottom;
    bottom: 10px;
    align-items: center;

    span{
        color: gray;
        font-weight: lighter;
        margin-top: 25px;
    }  
    
    footer{
        color: gray;
        font-size: 12px;
        font-weight: lighter;
        margin-top: -5px;
        text-align: center;
    }
`
export const Center = styled.div`
    display: row;
    align-items: center;
    width: 10%;
    height: 12vmin;
    pointer-events: none;
    background: #161a1e;
    border-radius: 100px;
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
`


export const LeftSide = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 20px;

img {
    width: 80px;
    height: 80px;
}
`

export const RightSide = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;

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
    transition: 0.25s;
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