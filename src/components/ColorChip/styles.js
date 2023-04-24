import styled from "styled-components";

export const Container = styled.div`
    width: 100px;
    height: 140px;
    background-color: ${props => props.color || '#000000'};
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    margin: 4px;
`

export const ChipText = styled.p`
    position: absolute;
    bottom: 5px;
    margin-bottom: 5px;
    margin-top: 0px;
    color: ${props => props.color || '#000000'};
    font-weight: bold;
    font-size: ${props => props.fontSize || '12px'};
    margin-left: 10px;
    margin-right: 10px;
`