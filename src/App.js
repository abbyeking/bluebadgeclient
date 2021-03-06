import React, { useState, useEffect } from 'react';
import Auth from './auth/Auth';
import Sitebar from './components/Navbar';
import './App.css';
import SearchView from './components/SearchView';
import FavoritesView from './components/FavoritesView';

function App() {

  const [sessionToken, setSessionToken] = useState('');
  const [currentView, setCurrentView] = useState('Search')
  const [component, setComponent] = useState('');

  useEffect( () => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken); 
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => {
    return(sessionToken === localStorage.getItem('token')  
        ?(
          <>
          <br></br>
            <SearchView token={sessionToken} />
            <br></br>
            <FavoritesView token={sessionToken} />
          </>
        )         
        :<Auth updateToken={updateToken} />
      )
  }

  return (
    <div className="App">
      <br></br>
      <Sitebar clearToken={clearToken} />
      {protectedViews()}

    </div>
  );
}

export default App;
