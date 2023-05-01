
import React from 'react'
import { useState } from "react";
import Prompter from '../../components/Prompter';
import Sidebar from '../../components/Sidebar';
import { Container, Wrapper } from './styles'
import Header from '../../components/Header'

const Main = ({editingId, setEditingId, favorites, setFavorites}) => {
  const [currentColors, setCurrentColors] = useState([])

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
