import styled from 'styled-components';

export const Main = styled.main`
    position: absolute;
    width: calc(100% - 300px);
    marginBottom: 100px;
    textAlign: center;

    @media all and (max-width: 767px) {
        position: inherit;
        width: 100%;
    }
`

export const Center = styled.section`
    position: relative;
    top: 50%; left: 50%;
    transform: translate3d(-50%,-50%,0);
`