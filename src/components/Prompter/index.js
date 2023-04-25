import React, { useState, useEffect } from 'react'
import { Configuration, OpenAIApi } from "openai";
import ColorChip from '../ColorChip';
import { PromptContainer, ResultContainer, Container} from './styles';
import PuffLoader from "react-spinners/PuffLoader";
import Switch from "@mui/joy/Switch";
import Typography  from "@mui/joy/Typography";
import Checkbox from "@mui/joy/Checkbox"
import TextField from "@mui/material/TextField"
import Button from "@mui/joy/Button"
import { Name, NameContainer } from './styles';

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
  });
const openai = new OpenAIApi(configuration);
  
const Prompter = ({currentColors, setCurrentColors}) => {
    const [numberInput, setNumberInput] = useState("");
    const [colorInput, setColorInput] = useState("");
    const [multiColor, setMultiColor] = useState(true);
    const [adjectiveInput, setAdjectiveInput] = useState("");
    const [resultColors, setResultColors] = useState(null);
    const [resultExplanation, setResultExplanation] = useState();
    const [explanation, setExplanation] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event) => {
        setLoading(true);
        let prompt = multiColor ? `Come up with hex codes for ${numberInput} colors that ${adjectiveInput}. List each color followed by a single space, including a space after the last color.` : `Come up with a hex code for a shade of ${colorInput} that ${adjectiveInput}. State the hex code by itself. `;
        if (multiColor) {
          prompt = prompt.concat(`Then, after listing all the colors, explain your choices, and delimit your explanation with a '\\'. Never place a '\\' anywhere else except to delimit your explanation. Always include '#' in your hex codes.`)
        }
        event.preventDefault();
        try {
    
          const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,            
            max_tokens: 400,
          });
          console.log(completion)
          setLoading(false);

          let resultArray = completion.data.choices[0].text.split('\\')
          setResultColors(resultArray[0]);
          setResultExplanation(resultArray[1])

    
        } catch(error) {
          console.error(error)
          alert(error.message)
        }
    }
   
    return (
        <Container>
        <NameContainer><Name>chromAI</Name></NameContainer>
        <PromptContainer>
          <Switch 
            startDecorator={<Typography>Multiple Colors</Typography>} 
            endDecorator={<Typography>One Color</Typography>}
            value={multiColor}
            onChange={(e) => {setResultColors(null); setMultiColor(!multiColor); setExplanation(false); setResultExplanation()}} 
          />
          <br/>
          <form onSubmit={onSubmit}>
            { multiColor ? (
                <div>
                  <h3>Generate</h3>
                  <TextField
                    type="text"
                    name="number"
                    variant="outlined"
                    size="small"
                    label="number"
                    value={numberInput}
                    onChange={(e) => setNumberInput(e.target.value)}/>
                  <h3>colors that</h3>
                  <p>"look like a sunset"</p>
                  <p>"go well in a fourth grader's bedroom"</p>
                  <p>"all contrast each other"</p>
                  <p>"remind you of an 80s disco"</p>
                </div>
                ) :
                (
                  <div>
                    <h3>Generate a shade of</h3>
                    <TextField
                      type="text"
                      name="color"
                      label="color"
                      size="small"
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}/>
                    <h3>that</h3>
                    
                    <p>"goes well with pale pink"</p>
                    <p>"looks like the sky"</p>
                    <p>"feels calming"</p>
                    <p>"contrasts with #32A852" </p>
                  </div>
                )}
              
              <TextField
                  name="adjective"
                  multiline
                  label="your prompt here!"
                  value={adjectiveInput}
                  margin="normal"
                  onChange={(e) => setAdjectiveInput(e.target.value)}
              />
              <br/>
              { multiColor ? 
                (<div>
                    <Checkbox
                      value={explanation}
                      onChange={(e) => setExplanation(!explanation)} 
                      label="Explain why the AI chose these colors"
                      
                    />
                  </div>) :
                  <br/>
              }
               
              { multiColor ? <Button sx={{marginTop: 2}} type="submit">Generate colors</Button>
                           : <Button type="submit">Generate color</Button>

              }
            </form>
            { loading && <PuffLoader size={40} /> }
            <p> {explanation && resultExplanation} </p>
            <ResultContainer>
            {
              multiColor ? 
                (resultColors && 
                    resultColors.split(" ").map(element => 
                        (element.includes('#') && <ColorChip currentColors={currentColors} setCurrentColors={setCurrentColors} hex={element.slice(element.indexOf('#')).trim()}/>
                ))) 
                : 
                (resultColors && 
                    <ColorChip currentColors={currentColors} setCurrentColors={setCurrentColors} hex={resultColors.trim()}/>)
            }
            </ResultContainer>
        </PromptContainer>
        </Container>
    );

}

export default Prompter