import styled from 'styled-components';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

export const List = styled.div`
    display: flex;
    position: relative;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
        background: #ffffff;
        height: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${lightBaseTheme.palette.primary1Color};
    }
`

List.Item = styled.div`
    position: relative;
    cursor: pointer;
    background: #ffffff linear-gradient(to top, #ffffff 0%, #efefef 100%);
    border: 1px solid rgba(0,0,0,0.4);
    border-radius: 10px;
    padding: 20px;
    margin: 6px;
`

List.Name = styled.h4`
    position: relative;
    line-height: 2.4em;
    padding-top: 20px;
    margin: 0 10px;
    &:empty {
        display: none;
    }
`

export const Cover = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${lightBaseTheme.palette.accent1Color};
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    margin-bottom: 3em;
    
    &:after {
        position: absolute; 
        content: '';
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: rgba(0,0,0,0.6);
        transition: opacity 0.3s ease-in;
        opacity: ${(props) => props.active?1:0};
    }

    &:before {
        position: absolute; 
        content: '';
        top: 0; left: 0; right: 0; bottom: 0;
        transition: opacity 0.3s ease-in;
        background-image: ${props => props.img?`linear-gradient(to right, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0) 10px), url(${props.img})`:''};
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        opacity: ${(props) => props.loaded?1:0};
    }
`

export const Title = styled.p`
    position: relative;
    height: 3.05em;
    margin: 0;
    margin-top: 1em;
    line-height: 1em;
    overflow: hidden;
    white-space: normal;
    padding-top: 20px;
    text-align: center;
    border-top: 1px solid rgba(0,0,0,0.4);
    //box-shadow: 0px -8px 4px -4px rgba(0,0,0,0.4);
`