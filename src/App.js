import React, {useState} from 'react'
import './App.css';
import Main from './containers/Main';

const App = () => {
  const [currentColors, setCurrentColors] = useState([])
  return (
    <Main setCurrentColors={setCurrentColors} currentColors={currentColors}/>
  );
}

export default App;
