import styled from "styled-components";

export const Container = styled.div`
    width: 50%;
    border: 2px solid #C0C0C0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    /* justify-content: center; */
`

export const NameContainer = styled.div`
    position: sticky;
    top: 0px;
    width: 100%;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid #C0C0C0;
    font-weight: bold;
    font-size: 25px;
    background-color: white;
    z-index: 5;
`

export const NameEditor = styled.input`
    border: none;
    font-weight: bold;
    font-size: 25px;
    max-width: 500px;
`

export const ButtonPanel = styled.div`
    position: sticky;
    min-height: 65px;
    width: 100%;
    bottom: 0px;
    background-color: white;
    border-top: 2px solid #C0C0C0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

`