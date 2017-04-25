import styled from 'styled-components';

const cover = `
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`

export const Header = styled.header`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;

    &:after {
        ${cover}
        content: '';
        background-color: rgba(0,0,0,0.4);
    }
`;

export const Title = styled.h1`
    color: #fff;
    text-align: center;
    font-family: 'Permanent Marker', sans-serif;
    letterSpacing: 0.2em;
    z-index: 1;
    margin: 0;
`