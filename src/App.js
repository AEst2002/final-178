import React, {useState} from 'react'
import './App.css';
import Main from './containers/Main';

const App = () => {
  const [currentColors, setCurrentColors] = useState([])
  const [favorites, setFavorites] = useState([])
  return (
    <Main setCurrentColors={setCurrentColors} currentColors={currentColors} favorites={favorites} setFavorites={setFavorites}/>
  );
}

export default App;
