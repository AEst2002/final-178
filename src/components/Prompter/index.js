import React, { useState, useEffect } from 'react'
import { Configuration, OpenAIApi } from "openai";
import ColorChip from '../ColorChip';
import { ResultContainer } from './styles';


const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
  });
const openai = new OpenAIApi(configuration);
  
const Prompter = ({currentColors, setCurrentColors}) => {
    const [numberInput, setNumberInput] = useState("");
    const [colorInput, setColorInput] = useState("");
    const [multiColor, setMultiColor] = useState(false);
    const [adjectiveInput, setAdjectiveInput] = useState("");
    const [resultColors, setResultColors] = useState(null);
    const [resultExplanation, setResultExplanation] = useState();
    const [explanation, setExplanation] = useState(false);

    const onSubmit = async (event) => {
        let prompt = multiColor ? `Come up with hex codes for ${numberInput} colors that ${adjectiveInput}. List each color followed by a single space, including a space after the last color.` : `Come up with a hex code for a shade of ${colorInput} that ${adjectiveInput}. State the hex code by itself. `;
        if (multiColor && explanation) {
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

          if (explanation) {
            let resultArray = completion.data.choices[0].text.split('\\')
            setResultColors(resultArray[0])
            setResultExplanation(resultArray[1])

          }

          else {
            setResultColors(completion.data.choices[0].text)
          }
         
    
        } catch(error) {
          console.error(error)
          alert(error.message)
        }
    }
   
    return (
        <div style={{width: "50%"}}>
          <input
              type="checkbox"
              value={multiColor}
              onChange={(e) => {setResultColors(null); setMultiColor(!multiColor); setExplanation(false); setResultExplanation()}} 
            />
            <span class="help-text">Multiple colors</span>
            <h3>Generate</h3>
            <form onSubmit={onSubmit}>
              { multiColor ? (
                  <div>
                    <input
                      type="text"
                      name="number"
                      placeholder="number"
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
                    <h3>a shade of</h3>
                    <input
                      type="text"
                      name="color"
                      placeholder="color"
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}/>
                    <h3>that</h3>
                    
                    <p>"goes well with pale pink"</p>
                    <p>"looks like the sky"</p>
                    <p>"feels calming"</p>
                    <p>"contrasts with #32A852" </p>
                  </div>
                )}
              
              <input
                  type="text"
                  name="adjective"
                  placeholder="your prompt here!"
                  value={adjectiveInput}
                  onChange={(e) => setAdjectiveInput(e.target.value)}
              />
              <br/>
              { multiColor ? 
                (<div>
                    <input
                      type="checkbox"
                      value={explanation}
                      onChange={(e) => setExplanation(!explanation)} 
                    />
                    <span class="help-text">Explain why the AI chose these colors.</span>
                  </div>) : <br/>
              }
               
              { multiColor ? <input type="submit" value="Generate colors" />
                           : <input type="submit" value="Generate color" />

              }
            </form>
            { resultExplanation }
            <ResultContainer>
            {
              multiColor ? 
                (resultColors && 
                    resultColors.split(" ").map(element => 
                        (element.includes('#') && <ColorChip currentColors={currentColors} setCurrentColors={setCurrentColors} hex={element.slice(element.indexOf('#')).trim()}/>
                ))) 
                : 
                (resultColors && <ColorChip currentColors={currentColors} setCurrentColors={setCurrentColors} hex={resultColors.trim()}/>)
            }
            </ResultContainer>
        </div>
    );

}

export default Prompter