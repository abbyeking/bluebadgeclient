import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
import './FavoritesView.css';
// import styled from 'styled-components'
import StyledButton from './Styles/Button'
import StyledH1 from './Styles/StyledH1'
import StyledOutterDiv from './Styles/StyledOutterDiv'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap'


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
            <Card>
                <CardBody>
            <StyledH1 className="favorites">Favorites</StyledH1>
            <StyledButton onClick={() => handleSubmit()}>View Favorites</StyledButton>
            { favorites?.length > 0 ?
                <>
                    {favorites.map(favorite => {
                        return (

                            <div>
                                <CardTitle><h4 key={favorite.id}>{favorite.title}</h4></CardTitle>
                                <CardImg top height="50%" src={favorite.image} alt="Recipe Image" />
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Servings: {favorite.servings}</CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Ready in: {favorite.readyInMinutes}</CardSubtitle>
                                <CardText>{favorite.sourceUrl}</CardText>
                                
                                <StyledButton onClick={() => { deleteRecipe(favorite.id) }}>Delete</StyledButton>
                                <input onChange={(e) => setTitle(e.target.value)}></input><StyledButton onClick={() => { updateRecipe(favorite.id) }}>Update Title</StyledButton>
                            </div>

                        )
                    })}
                </>
                : null
            }
                </CardBody>
            </Card>
        </StyledOutterDiv>
    )

}

export default FavoritesView;

// {/* <div>
// <Card>
//     <CardImg width="50px" height="1000px" src={rec.image} alt="Recipe Image" />
//     <CardBody>
//         <CardTitle><h4 key={rec.id}>{rec.title}</h4></CardTitle>
//         {/* <CardSubtitle tag="h6" className="mb-2 text-muted">{full_info.servings}</CardSubtitle>
//         <CardSubtitle tag="h6" className="mb-2 text-muted">{full_info.readyInMinutes}</CardSubtitle>
//         <CardText>{full_info.sourceUrl}</CardText> */}

//         <StyledButton onClick={async (e) => {
//             e.preventDefault();
//             let full_info = await recipeDetailFetch(rec.id);
//             console.log(rec, full_info);
//             sendRecipe(rec.title, rec.id, rec.image, full_info.servings, full_info.readyInMinutes, full_info.sourceUrl)
//         }}>Save Recipe</StyledButton>

//     </CardBody>
// </Card>
// </div> */}