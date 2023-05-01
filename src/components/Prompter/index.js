import React, { useState, useEffect } from 'react'
import { Configuration, OpenAIApi } from "openai";
import ColorChip from '../ColorChip';
import { PromptContainer, ResultContainer, Container, Chev } from './styles';
import PuffLoader from "react-spinners/PuffLoader";
import Switch from "@mui/joy/Switch";
import Typography  from "@mui/joy/Typography";
import Checkbox from "@mui/joy/Checkbox"
import TextField from "@mui/material/TextField"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Button from "@mui/joy/Button"
import { Face, InfoOutlined } from '@mui/icons-material';
import ChevDown from '../../assets/ChevDown.png'
import ChevRight from '../../assets/ChevRight.png'


const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
  });
const openai = new OpenAIApi(configuration);
  
const Prompter = ({currentColors, setCurrentColors, favorites, setFavorites}) => {
    const [numberInput, setNumberInput] = useState("");
    const [colorInput, setColorInput] = useState("");
    const [multiColor, setMultiColor] = useState(true);
    const [adjectiveInput, setAdjectiveInput] = useState("");
    const [resultColors, setResultColors] = useState(null);
    const [resultExplanation, setResultExplanation] = useState();
    const [explanation, setExplanation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false)
    const [tryAgain, setTryAgain] = useState(false)
  

    useEffect(() => {
      const favJSON = localStorage.getItem('favorites')
      if (favJSON){
        setFavorites(JSON.parse(favJSON))
      }
    }, [setFavorites])

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
          setTryAgain(true);


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
          <PromptContainer>
            <Switch 
              startDecorator={<Typography sx={{fontSize: 16}}>Multiple Colors</Typography>} 
              endDecorator={<Typography sx={{fontSize: 16}}>One Color</Typography>}
              value={multiColor}
              onChange={(e) => {setResultColors(null); setMultiColor(!multiColor); setExplanation(false); setResultExplanation(); setAdjectiveInput("")}} 
            />
            <br/>
            <form style={{marginBottom: '15px'}} onSubmit={onSubmit}>
              { multiColor ? (
                  <div>
                    <h3>Generate</h3>
                    <TextField
                      sx={{width: "250px"}}
                      type="number"
                      name="number"
                      variant="outlined"
                      size="medium"
                      label="number"
                      inputProps={{ min: 1, max: 21 }} 
                      value={numberInput}
                      required="true"
                      onChange={(e) => setNumberInput(e.target.value)}/>
                    <h3>colors that</h3>
                  </div>
                  ) :
                  (
                    <div>
                      <h3>Generate a shade of</h3>
                      <TextField
                        sx={{width: "250px"}}
                        type="text"
                        name="color"
                        label="color"
                        size="medium"
                        value={colorInput}
                        required="true"
                        onChange={(e) => setColorInput(e.target.value)}/>
                      <h3>that</h3>
                    </div>
                  )}
                <Accordion sx={{width: "247px", boxShadow: 0, borderRadius: "10px", border: 1, borderColor: "#3b86cb", borderWidth: "2px"}}>
                  <AccordionSummary>
                    <InfoOutlined color="info" sx={{marginRight: "5px"}}/>
                    <Typography style={{color: "#3b86cb"}}>What can I ask?</Typography>
                  </AccordionSummary>
                  { multiColor ? 
                  <AccordionDetails>
                      <p>"look like a sunset"</p>
                      <p>"go well in a fourth grader's bedroom"</p>
                      <p>"all contrast each other"</p>
                      <p>"remind you of an 80s disco"</p>
                  </AccordionDetails>
                  : 
                  <AccordionDetails>
                      <p>"goes well with pale pink"</p>
                      <p>"looks like the sky"</p>
                      <p>"feels calming"</p>
                      <p>"contrasts with #32A852" </p>
                  </AccordionDetails>}
                </Accordion>
                <TextField
                    sx={{width: "250px"}}
                    name="adjective"
                    multiline
                    label="your prompt here!"
                    value={adjectiveInput}
                    margin="normal"
                    onChange={(e) => {setTryAgain(false); setAdjectiveInput(e.target.value)}}
                />
                <br/>
                { multiColor ? 
                  (<div>
                      <Checkbox
                      sx={{marginTop: 2}}
                        value={explanation}
                        onChange={(e) => setExplanation(!explanation)} 
                        label="Explain why the AI chose these colors"
                        
                      />
                    </div>) :
                    <br/>
                }
                {
                  ( tryAgain ) ?
                    <Button sx={{ fontSize: '16px', marginTop: 2}} type="submit">Not quite right? Try again!</Button>
                  : ( multiColor ? <Button sx={{fontSize: '16px', marginTop: 2}} type="submit"> Generate colors</Button>
                                 : <Button sx={{fontSize: '16px'}} type="submit">Generate color</Button>
                    )
                }
                
              </form>
              { loading && <PuffLoader size={40} /> }
              <p> {explanation && resultExplanation} </p>
              
              {
                resultColors &&
                <div>
                  <Typography sx={{marginTop: '15px', fontWeight: "bold"}}>The AI thinks you'll like:</Typography>

                  <ResultContainer>
                    {(multiColor ?
                        resultColors.split(" ").map(element => 
                            (element.includes('#') && <ColorChip currentColors={currentColors} setCurrentColors={setCurrentColors} hex={element.slice(element.indexOf('#')).trim()}/>
                    )) 
                    : <ColorChip currentColors={currentColors} setCurrentColors={setCurrentColors} hex={resultColors.trim()}/> )}
                  </ResultContainer>
                </div>
              }
              {
                favorites.length > 0 &&
                  <>
                    <Typography onClick={() => setShowFavorites(!showFavorites)} sx={{display: 'flex', alignItems: 'center', width: '150px', cursor: 'pointer', marginTop: '15px', fontWeight: "bold"}}>
                        Your favorites <Chev src={showFavorites ? ChevDown : ChevRight}/> 
                    </Typography>
                    {showFavorites &&
                      <ResultContainer>
                        {favorites.map((color) => {
                          return <ColorChip currentColors={currentColors} setCurrentColors={setCurrentColors} hex={color}/>
                        })}  
                      </ResultContainer>
                    }
                  </>
              }       
          </PromptContainer>
        </Container>
    );

}

export default Prompter