import react, { useEffect,useState } from 'react';
// import Navbar from '../components/Navbar';
import './FavoritesView.css';

const FavoritesView = (props) => {
    const[favorites,setFavorites] =useState([]);

    const handleSubmit = () => {
        fetch('http://localhost:3000/recipe', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then ((res) => res.json())
        .then((logData) => {
            setFavorites(logData)
        })
    }

    useEffect(()=>{
        handleSubmit();
    }, [])


    return (
        <div>
            <h1 className="favorites">View My Favorites</h1>
        </div>
    )
}

export default FavoritesView;