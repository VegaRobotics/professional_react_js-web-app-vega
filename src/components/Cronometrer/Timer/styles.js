import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
`
export const CTimer = styled.div`
    .timer{
        margin : 3rem 0;
        width: 100%;
        display: flex;
        height: 12%;
        justify-content: center;
        align-items: center;
    }
    
    .digits{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 3rem;
        color:  black;
    }
    
    .mili-sec{
        color:  #e42a2a;
    }
`