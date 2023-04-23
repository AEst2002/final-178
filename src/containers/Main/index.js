
import React from 'react'
// import Head from "next/head";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import ColorRow from '../../components/ColorRow';
import Prompter from '../../components/Prompter';
import Sidebar from '../../components/Sidebar';
import { Container } from './styles'

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);


const Main = ({setCurrentColors, currentColors}) => {
  const [colorInput, setColorInput] = useState("");
  const [result, setResult] = useState();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {

      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Come up with a hex code for a light shade of ${colorInput}`,
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
    <Container>
        <Prompter currentColors={currentColors} setCurrentColors={setCurrentColors}/>
        <Sidebar setCurrentColors={setCurrentColors} currentColors={currentColors}/>
    </Container>
  );
}

export default Main
