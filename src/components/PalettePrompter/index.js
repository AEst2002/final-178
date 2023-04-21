import { React, useState } from 'react'
import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
  });
const openai = new OpenAIApi(configuration);
  
const PalettePrompter = () => {
    const [numberInput, setNumberInput] = useState("");
    const [adjectiveInput, setAdjectiveInput] = useState("");
    const [result, setResult] = useState();
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
    
          const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Come up with hex codes for a ${adjectiveInput} palette of ${numberInput} colors`,
            temperature: 0.6,
            max_tokens: 100,
          });
          console.log(completion)
    
          setResult(completion.data.choices[0].text);
        } catch(error) {
          console.error(error);
          alert(error.message);
        }
    }


    return (
        <div style={{width: "50%"}}>
            <h3>Generate a</h3>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="adjective"
                    placeholder="adjective"
                    value={adjectiveInput}
                    onChange={(e) => setAdjectiveInput(e.target.value)}
                />
                <h3>palette of</h3>
                <input
                    type="text"
                    name="number"
                    placeholder="number"
                    value={numberInput}
                    onChange={(e) => setNumberInput(e.target.value)}
                />
                <h3>colors</h3>
                <input type="submit" value="Generate palete" />
            </form>
            <div style={{backgroundColor: result}}>{result}</div>
        </div>
    );

}

export default PalettePrompter