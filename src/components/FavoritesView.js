import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
import './FavoritesView.css';
// import styled from 'styled-components'
import StyledButton from './Styles/Button'
import StyledH1 from './Styles/StyledH1'
import StyledOutterDiv from './Styles/StyledOutterDiv'


const FavoritesView = (props, userRecipe) => {
    const [favorites, setFavorites] = useState([]);
    const [title, setTitle] = useState([userRecipe.title]);

    const handleSubmit = () => {
        fetch('http://localhost:3000/recipe/', {
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

    const deleteRecipe = (id) => {
        fetch(`http://localhost:3000/recipe/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": props.token
            },
        }).then(() => {
            console.log("Deleted Successfully");
            handleSubmit();
        })
    }

    const updateRecipe = (id) => {
        console.log(id)
        fetch(`http://localhost:3000/recipe/update/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": props.token
            },
            body: JSON.stringify({
                title: title,
            })
        }).then(() => {
            handleSubmit();
            console.log(title);
        })
    }


    return (
        <StyledOutterDiv>
            <StyledH1 className="favorites">Favorites</StyledH1>
            <StyledButton onClick={() => handleSubmit()}>View Favorites</StyledButton>
            { favorites?.length > 0 ?
                <>
                    {favorites.map(favorite => {
                        return (

                            <div>
                                <p></p>
                                <p>{favorite.title}</p>
                                <p>{favorite.rId}</p>
                                <StyledButton onClick={() => { deleteRecipe(favorite.id) }}>Delete</StyledButton>
                                <input onChange={(e) => setTitle(e.target.value)}></input><StyledButton onClick={() => { updateRecipe(favorite.id) }}>Update Title</StyledButton>
                            </div>

                        )
                    })}
                </>
                : null
            }
        </StyledOutterDiv>
    )

}


export default FavoritesView;