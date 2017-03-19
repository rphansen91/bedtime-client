import styled from 'styled-components';

const backgroundImg = (props) => {
    if (props.img) return `url(${props.img})`;
    return ''
}

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
    background: ${props => backgroundImg(props)} center no-repeat;
    background-size: cover;
    height: ${props => props.height || '100%'}
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
    font-family: chalkboard;
    z-index: 1;
`