import React, { useState, useEffect } from 'react';
import Auth from './auth/Auth';
import Sitebar from './components/Navbar';
import './App.css';
import Dashboard from './components/Dashboard';
// import WorkoutIndex from './workouts/WorkoutIndex'


function App() {

  const [sessionToken, setSessionToken] = useState('');

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
      ? <Dashboard token={sessionToken} />
      : <Auth updateToken={updateToken} />
      )
  }

  return (
    <div className="App">
      <Auth updateToken={updateToken}/>
      <Sitebar clearToken={clearToken}/>
      {protectedViews()}
    </div>
  );
}

export default App;
