import styled from "styled-components";

export const ResultContainer = styled.div`
    width: 100%;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
`

export const NameContainer = styled.div`
    position: sticky;
    top: 0px;
    width: 100%;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: left;
    border-bottom: 2px solid #C0C0C0;
    font-weight: bold;
    font-size: 25px;
    background-color: white;
    z-index: 5;
`
// export const Name = styled(NameContainer)`

export const Name = styled.text`
    background: linear-gradient(to left, red, orange, yellow, green, blue, purple);
    -webkit-background-clip: text;
    color: transparent;
    width: 12.9%;
`

export const PromptContainer = styled.div`
    width: 50%;
    /* padding: 10px; */
    line-height: 20px;
    margin-top: 5px;
`

// export const Input = styled.input.attrs({type: "text"})`
export const Input = styled.input`
    border-radius: 3px;
    padding: 4px;

`