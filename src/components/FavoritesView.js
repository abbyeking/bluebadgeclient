import React, { useEffect, useState } from 'react';
import './FavoritesView.css';
import StyledButton from './Styles/Button'
import StyledH1 from './Styles/StyledH1'
import StyledOuterDiv from './Styles/StyledOuterDiv'
import {
    Card, CardImg, CardText, CardLink, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
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
            handleSubmit();
        })
    }

    const updateRecipe = (id) => {
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
        })
    }


    return (

        <StyledOuterDiv>
            <Row className="justify-content-md-center">
                <Col xs={12} sm={4} md={4}>
                    <StyledH1 id="Favorites" className="favorites">Favorites</StyledH1>
                    <StyledButton onClick={() => handleSubmit()}>View Favorites</StyledButton>
                    <br></br>
                    <br></br>
                    {favorites?.length > 0 ?
                        <>
                            {favorites.map(favorite => {
                                return (
                                    <div>
                                        <br></br>
                                        <br></br>
                                        <Card>
                                            <CardBody>
                                                <div>
                                                    <CardTitle><h4 key={favorite.id}>{favorite.title}</h4></CardTitle>
                                                    <CardImg id="images" src={favorite.image} alt="Recipe Image" />
                                                    <br />
                                                    <br />


                                                    <CardSubtitle tag="h6" className="mb-2 text-muted">Servings: {favorite.servings}</CardSubtitle>
                                                    <CardSubtitle tag="h6" className="mb-2 text-muted">Ready in: {favorite.readyInMinutes} mins.</CardSubtitle>
                                                    {/* <CardText>{favorite.sourceUrl}</CardText> */}
                                                    <CardLink id="red" href={favorite.sourceUrl} target="_blank" >Link to recipe</CardLink>
                                                    <br />
                                                    <br />


                                                    <StyledButton onClick={() => { deleteRecipe(favorite.id) }}>Delete</StyledButton>
                                                    <br></br>
                                                    <br />
                                                    <input style={{ margin: "0 0 .5rem" }} onChange={(e) => setTitle(e.target.value)}></input>
                                                    <StyledButton onClick={() => { updateRecipe(favorite.id) }}>Update Title</StyledButton>

                                                    <br />
                                                    <br />

                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                )
                            })}
                        </>
                        : null
                    }
                </Col>
            </Row>
        </StyledOuterDiv>

    )

}

export default FavoritesView;

