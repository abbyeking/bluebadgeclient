import React, { useState, useEffect } from 'react';
import Auth from './auth/Auth';
import Sitebar from './components/Navbar';
import './App.css';
import SearchView from './components/SearchView';
import FavoritesView from './components/FavoritesView';
import UpdateForm from './components/UpdateForm';

function App() {
  const pages = [
    {component: <SearchView />, title:"Search"},
    {component: <FavoritesView />, title:"Favorites"}
]
  const [sessionToken, setSessionToken] = useState('');
  //const [currentView, setCurrentView] = useState('Favorites')
  const [currentView, setCurrentView] = useState('Search')
  const [component, setComponent] = useState(pages[0].component);

  useEffect( () => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken); 
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => {
    // under what circumstances would this be false? udateToken both sets the same token in the state variable and the
    // local storage. works just as well to check if a token exists without comparing the state to the local storage
    return(sessionToken === localStorage.getItem('token')  
      ? currentView == "Favorites" 
        ? <FavoritesView token={sessionToken} />
        :<SearchView token={sessionToken} />
      : <Auth updateToken={updateToken} />
      )
  }

  return (
    <div className="App">
      <Sitebar clearToken={clearToken} setComponent={setComponent}/>
      {protectedViews()}
      <FavoritesView />
      <UpdateForm />
    </div>
  );
}

export default App;
