import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;    
    `;
export const SText = styled.div`
    display: flex;
    width: 100%;
    margin-top: 110px;
    margin-bottom: 110px;
    span {
        z-index: 1;
        line-height: 1.5;
        font-size: 55px;
        align-items: center;
        text-align: center;
        justify-content: center;
        justify-items: center;
        color: #FFF;
        font-weight: regular;
        text-decoration: none;
        text-align: center;
        margin: 0 auto;

        -webkit-animation: fadeinup 2s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadeinup 2s; /* Firefox < 16 */
        -ms-animation: fadeinup 2s; /* Internet Explorer */
        -o-animation: fadeinup 2s; /* Opera < 12.1 */
        animation: fadeinup 2s;
}
`;

export const SVideo = styled.div`
    position: absolute;
    width: 100%;
    z-index: -1;
    opacity: 0.1;
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
    }
`;