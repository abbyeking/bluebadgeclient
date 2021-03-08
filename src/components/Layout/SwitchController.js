import React from "react";
import  Sitebar from "../Navbar";
import  FavoritesView  from "../FavoritesView";
import  SearchView  from "../SearchView";
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';


const SwitchController = (props) => {
    return (
    <div>
        <Router>
            <Switch>
                <Route exact path="/favorites">
                    <FavoritesView token={props.token}/>
                </Route>
            </Switch>
        </Router>
    </div>
)}


export default SwitchController;