import styled from "styled-components";

export const RowContainer = styled.div`
    /* width: 500px; */
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
    font-size: ${props => props.fontSize || '50px'};
    color: ${props => props.color || '#000000'};
`
