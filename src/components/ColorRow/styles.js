import styled from "styled-components";

export const RowContainer = styled.div`
    width: 100%;
    height: 130px;
    min-height: 130px;
    background-color: ${props => props.color || '#000000'};
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
`

export const RowText = styled.div`
    font-size: ${props => props.fontSize || '20px'};
    color: ${props => props.color || '#000000'};
`

export const Chevron = styled.img`
    width: 30px;
    height: 30px;
    position: absolute;
    right: 0px;

    :hover{
        cursor: pointer;
    }
`