
import React from 'react'
// import Head from "next/head";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import ColorRow from '../../components/ColorRow';
import Prompter from '../../components/Prompter';
import Sidebar from '../../components/Sidebar';
import { Container, Wrapper } from './styles'
import Button from '../../components/Button';
import Header from '../../components/Header'
import { useParams } from "react-router-dom";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);


const Main = ({editingId, setEditingId, favorites, setFavorites}) => {
  const [currentColors, setCurrentColors] = useState([])
  // const [colorInput, setColorInput] = useState("");
  // const [result, setResult] = useState();

  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   try {

  //     const completion = await openai.createCompletion({
  //       model: "text-davinci-003",
  //       prompt: `Come up with a hex code for a light shade of ${colorInput}`,
  //       temperature: 0.6,
  //     });

  //     setResult(completion.data.choices[0].text);
  //     // setAnimalInput("");
  //   } catch(error) {
  //     console.error(error);
  //     alert(error.message);
  //   }
  // }

console.log(favorites)
  return (
    <Wrapper>
        <Header />
        <Container>
            <Prompter 
              favorites={favorites} 
              setFavorites={setFavorites} 
              currentColors={currentColors} 
              setCurrentColors={setCurrentColors}
            />
            <Sidebar 
              setEditingId={setEditingId} 
              editingId={editingId} 
              favorites={favorites} 
              setFavorites={setFavorites} 
              setCurrentColors={setCurrentColors} 
              currentColors={currentColors}
            />
        </Container>
    </Wrapper>
    
  );
}

export default Main
