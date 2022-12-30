import styled from 'styled-components';

export const Container = styled.div`
    /* position: absolute; */
    flex-direction: column;
    width: 100%;
    height: 100%;

    @media (min-width: 200px){
        #webcam {
            width: 50%;
            flex-direction: column;
        }
    }

    @media (max-width: 160px){
        #webcam {
            width: 70%;
            flex-direction: column;
        }
    }
`;