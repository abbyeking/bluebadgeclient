import React, { useState, useEffect } from 'react';
import Auth from './auth/Auth';
import Sitebar from './components/Navbar';
import './App.css';
import SearchView from './components/SearchView';
import FavoritesView from './components/FavoritesView';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

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


//   const protectedViews = () => {
//     return(sessionToken === localStorage.getItem('token')  
//         ?(
//           <>
//           <br></br>
//             <SearchView token={sessionToken} />
//             <br></br>
//             <FavoritesView token={sessionToken} />
//           </>
//         )         
//         :<Auth updateToken={updateToken} />
//       )
//   }

  return (
    <div className="App">
      <br></br>
      <Router>
        <Sitebar clearToken={clearToken} token={sessionToken} />
        <Switch>
          <Route exact path="/">
            {sessionToken === localStorage.getItem("token") ? (
              <Redirect to="/search" />
            ) : (
              <Auth updateToken={updateToken} />
            )}
          </Route>
          
          <Route exact path="/favorites">
            <FavoritesView token={sessionToken} />
          </Route>
          <Route exact path="/search">
            <SearchView token={sessionToken} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
