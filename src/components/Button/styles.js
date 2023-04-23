import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => props.width || '100px'};
    height: ${props => props.height || '40px'};
    background-color: ${props => props.color || '#2b2b2b'};
    border-radius: 10px;
    cursor: pointer;
`

export const ButtonText = styled.p`
    color: ${props => props.textColor || '#FFFFFF'};
    font-size: ${props => props.fontSize || '15px'};
    font-weight: bold;
`