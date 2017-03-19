import styled from 'styled-components';

export const Book = styled.section`
    position: absolute;
    text-align: center;
    width: calc(100% - 300px);
    overflow: hidden;
    top: 64px;
    bottom: 0;
    left: 0;

    @media all and (max-width: 767px) {
        top: 40vh;
        width: 100%;
    }
`

const controlMixin = `
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 100px;
    transform: translate3d(0,0,0);
    opacity: 1;
    transition: transform 0.3s ease-in, opacity 0.3s ease-in;
`

const Next = styled.div`
    ${controlMixin}
    ${props => props.visible ? '' : `
        transform: translate3d(100%,0,0);
        opacity: 0;
    `}
    right: 0;
`

const Prev = styled.div`
    ${controlMixin}
    ${props => props.visible ? '' : `
        transform: translate3d(-100%,0,0);
        opacity: 0;
    `}
    left: 0;
`

export const Controls = {
    Next,
    Prev
}