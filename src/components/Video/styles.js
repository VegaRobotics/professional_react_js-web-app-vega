import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
`;

export const SVideo = styled.div`
    opacity: 0.3;
    @media (min-width: 1000px){
        #videoBanner {
            width: 100%;
            height: 30%;
        }
    }

    @media (max-width: 700px){
        #videoBanner {
            width: 100%;
            height: 40%;
        }
    }
`;

export const Text = styled.div`
    position: absolute;
    z-index: 999;
    justifi-content: center;
    top: 35%;
    left: 15%;
    span {
        opacity: 1;
        line-height: 1.5;
        font-size: 60px;
        text-align:center;
        color: #FFF;
        font-weight: regular;
        text-decoration: none;
        margin: 0 auto;

        -webkit-animation: fadeinup 2s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadeinup 2s; /* Firefox < 16 */
        -ms-animation: fadeinup 2s; /* Internet Explorer */
         -o-animation: fadeinup 2s; /* Opera < 12.1 */
            animation: fadeinup 2s;
}

@keyframes fadeinup {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Firefox < 16 */
@-moz-keyframes fadeinup {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadeinup {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Internet Explorer */
@-ms-keyframes fadeinup {
    from { opacity: 0; }
    to   { opacity: 1; }
}
    }
`;