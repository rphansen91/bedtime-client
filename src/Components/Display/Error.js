import styled from 'styled-components';

export const Error = styled.div`
    position: absolute;
    padding: 20px;
    margin: 20px;
    background-color: rgba(0,0,0,0.4);
    color: #fff;

    &:empty {
        display: none;
    }
`