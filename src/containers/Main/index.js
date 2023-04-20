
import React from 'react'
import Head from "next/head";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import ColorRow from '../../components/ColorRow';

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);


const Main = () => {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {

      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Come up with a hex code for a light shade of ${animalInput}`,
        temperature: 0.6,
      });
      console.log(completion)
      // const response = await fetch("../../gpt/generate", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ animal: animalInput }),
      // });

      
      // const data = await response.json();
      // if (response.status !== 200) {
      //   throw data.error || new Error(`Request failed with status ${response.status}`);
      // }

      setResult(completion.data.choices[0].text);
      // setAnimalInput("");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>

      <main>
        <ColorRow hex={'#9EA587'}/>
        <ColorRow hex={'#632A50'}/>
        <ColorRow hex={'#C2E812'}/>

        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div style={{backgroundColor: 'pink'}}>{result}</div>
      </main>
    </div>
  );
}

export default Main
