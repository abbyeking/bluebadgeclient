import react, { useEffect,useState } from 'react';

const FavoritesView = () => {
    const[favorites,setFavorites] =useState([]);

    const fetchRecipes = (props) => {
        fetch(`http://localhost:3000/create/`, {
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
        fetchRecipes();
    }, [])


    return (
        <div>
            <h1>View Your Favorites</h1>
        </div>
    )
}

export default FavoritesView;