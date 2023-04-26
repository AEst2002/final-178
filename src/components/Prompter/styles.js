import styled from "styled-components";

export const ResultContainer = styled.div`
    width: 100%;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
`

export const ExamplePrompt = styled.div`
    font-weight: lighter; 
    font-style: italic;
    position: absolute;
    left: 250px;
    top: 160px;
`


export const Container = styled.div`
    width: 100%;
    border: 2px solid #C0C0C0;
    border-right: none;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: scroll;
`



export const PromptContainer = styled.div`
    width: 85%;
    padding: 10px;
    line-height: 20px;
    margin-top: 5px;
`