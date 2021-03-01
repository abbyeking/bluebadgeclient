import react, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
import './FavoritesView.css';

const FavoritesView = (props) => {
    const [favorites, setFavorites] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/recipe', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
            .then((logData) => {
                setFavorites(logData)
                console.log(logData)
            })
    }

    // useEffect(()=>{
    //     handleSubmit();
    // }, [])


    return (
        <div>
            <h1 className="favorites">Favorites</h1>
            <button onClick={handleSubmit}>View Favorites</button>
            {favorites.map(favorite => {
                return (
                    <div>
                        <p></p>
                        <p>{favorite.title}</p>
                        <p>{favorite.rId}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default FavoritesView;