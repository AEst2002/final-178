import { React, useState } from 'react'
import { Configuration, OpenAIApi } from "openai";
import ColorChip from '../ColorChip';


const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const ColorPrompter = ({currentColors, setCurrentColors}) => {
    const [colorInput, setColorInput] = useState("");
    const [adjectiveInput, setAdjectiveInput] = useState("");
    const [result, setResult] = useState();
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
    
          const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Come up with a hex code for a ${adjectiveInput} shade of ${colorInput}`,
            temperature: 0.6,
          });
          console.log(completion)
    
          setResult(completion.data.choices[0].text);
        } catch(error) {
          console.error(error);
          alert(error.message);
        }
    }

    console.log(result)
    return (
        <div style={{width: "60%",}}>
            <h3>Generate a</h3>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="adjective"
                    placeholder="adjective"
                    value={adjectiveInput}
                    onChange={(e) => setAdjectiveInput(e.target.value)}
                />
                <h3>shade of</h3>
                <input
                    type="text"
                    name="color"
                    placeholder="color"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                />
                <input type="submit" value="Generate color" />
            </form>
            {result && <ColorChip currentColors={currentColors} setCurrentColors={setCurrentColors} hex={result.trim()}/>}
        </div>
    );

}

export default ColorPrompter