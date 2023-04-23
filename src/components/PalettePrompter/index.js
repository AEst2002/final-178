import { React, useState } from 'react'
import { Configuration, OpenAIApi } from "openai";
import ColorChip from '../ColorChip';


const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
  });
const openai = new OpenAIApi(configuration);
  
const PalettePrompter = ({currentColors, setCurrentColors}) => {
    const [numberInput, setNumberInput] = useState("");
    const [colorInput, setColorInput] = useState("");
    const [multiColor, setMultiColor] = useState(false);
    const [adjectiveInput, setAdjectiveInput] = useState("");
    const [resultColors, setResultColors] = useState();
    const [resultExplanation, setResultExplanation] = useState();
    const [explanation, setExplanation] = useState(false);

    const onSubmit = async (event) => {
        let prompt = multiColor ? `Come up with hex codes for ${numberInput} colors that ${adjectiveInput}. List each color followed by a single space, including the last color.` : `Come up with a hex code for a shade of ${colorInput} that ${adjectiveInput} `;
        if (explanation) {
          prompt = multiColor ? prompt.concat(`Then, starting with '\\', explain why you chose those colors. Keep the list of colors separate from the explanation`) : `Then, starting with '\\', explain why you chose that color.`;
        }
        event.preventDefault();
        try {
    
          const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,            
            max_tokens: 200,
          });

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
                    
                    <p>"goes well with pale pink"</p>
                    <p>"looks like the sky"</p>
                    <p>"is very bright"</p>
                    <p>"feels calming"</p>
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
              <input
                type="checkbox"
                value={explanation}
                onChange={(e) => setExplanation(!explanation)} 
              />
              { multiColor ? <span class="help-text">Explain why the AI chose these colors.</span>
                           :  <span class="help-text">Explain why the AI chose this color.</span>
              }
               
              { multiColor ? <input type="submit" value="Generate colors" />
                           : <input type="submit" value="Generate color" />

              }
            </form>
            {  
              resultColors && multiColor && resultColors.split(" ").slice(0, -1).map(element => (
                 <ColorChip currentColors={currentColors} setCurrentColors={setCurrentColors} hex={element.trim()}/>
              ))
            }
            {
              resultColors && !multiColor && <ColorChip currentColors={currentColors} setCurrentColors={setCurrentColors} hex={resultColors.trim()}/>
            }
            { resultExplanation }
        </div>
    );

}

export default PalettePrompter