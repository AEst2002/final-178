import styled from 'styled-components'

export const Square = styled.div`
    width: 200px;
    height: 200px;
    margin: 15px;
    background-color: lavender;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;
    border-width: 2px;
    border-style: solid;
    border-color: ${props => props.bcol || 'black'};
`

export const PaletteGrid = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding-top: 5px;
    /* padding-left: 5px; */
    /* padding-right: 5px; */
`

export const ButtonPanel = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`