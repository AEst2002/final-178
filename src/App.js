import React, {useState} from 'react'
import './App.css';
import Main from './containers/Main';

const App = () => {
  const [currentColors, setCurrentColors] = useState(['#C2E812', '#632A50', '#9EA587'])
  return (
    <Main currentColors={currentColors}/>
  );
}

export default App;
