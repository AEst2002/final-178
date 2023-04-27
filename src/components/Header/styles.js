import styled from 'styled-components'

export const NameContainer = styled.div`
    position: sticky;
    top: 0px;
    width: 100vw;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: left;
    border-bottom: 1px solid #C0C0C0;
    font-weight: bold;
    font-size: 25px;
    background-color: white;
    z-index: 5;
`

export const Name = styled.text`
    background: linear-gradient(to left, red, orange, yellow, green, blue, purple);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    width: 100px;
    margin-left: 10px;
`