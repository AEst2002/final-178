import React, {useState} from 'react'
import './App.css';
import Main from './containers/Main';

const App = () => {
  const [favorites, setFavorites] = useState([])
  const [editingId, setEditingId] = useState(null)
  return (
    <Main 
      editingId={editingId}
      setEditingId={setEditingId}
      favorites={favorites} 
      setFavorites={setFavorites}/>

  );
}

export default App;
