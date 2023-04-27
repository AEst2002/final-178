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
    height: 100vh;
    border: 2px solid #C0C0C0;
    border-right: none;
    display: flex;
    flex-direction: column;
    overflow: auto;
    margin-bottom: 100px;
`



export const PromptContainer = styled.div`
    width: 85%;
    padding: 10px;
    line-height: 20px;
    margin-top: 5px;
`

export const ExitLink = styled.a`
    margin-left: 10px;
    margin-top: 10px;
    color: #373737;
    :visited{
        color: #373737;
    }
    
`