import React, {useState} from 'react'
import './App.css';
import Main from './containers/Main';
import View from './containers/View'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Library from './containers/Library';

const App = () => {
  const [favorites, setFavorites] = useState([])
  const [editingId, setEditingId] = useState(null)
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Library />} />
        <Route 
          exact 
          path='/palette/:id' 
          element={
            <Main 
              editingId={editingId}
              setEditingId={setEditingId}
              favorites={favorites} 
              setFavorites={setFavorites}
            />}
        />
        <Route
          exact 
          path='/view/:id' 
          element={
            <View 
              editingId={editingId}
              setEditingId={setEditingId}
              favorites={favorites} 
              setFavorites={setFavorites}
            />}
        />
        
      </Routes>
      
    </Router>


  );
}

export default App;
