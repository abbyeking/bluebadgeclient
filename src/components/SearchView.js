import { useState, useEffect } from 'react'
// import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
// import styled from 'styled-components'
import StyledButton from './Styles/Button'
import StyledH1 from './Styles/StyledH1'
import StyledOutterDiv from './Styles/StyledOutterDiv'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap'

const SearchView = (props) => {
    const [recipes, setRecipes] = useState([])
    // const [title, setTitle] = useState([])
    // const [rId, setrId] = useState([])
    const [userSearch, setUserSearch] = useState()

    const getRecipesByQuery = async (q) => {
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=2f00196142ab4db59cc5132da2a5c674&query=${q}`
        let response = await fetch(url)
        let dan = await response.json()
        console.log(dan)
        return dan.results
    }
    const recipeSearch = async () => {
        let qResult = await getRecipesByQuery(userSearch)
        //console.log(typeof qResult);
        setRecipes(qResult)
    }
    const recipeDetailFetch = async (rId) => {

        let res = await fetch(`https://api.spoonacular.com/recipes/${rId}/information?apiKey=2f00196142ab4db59cc5132da2a5c674`, {
            headers: new Headers({
                'Content-Type': "application/json"
            })
        })

        let json = await res.json()

        return json
    }


    useEffect(() => {
    }, [userSearch])

    const sendRecipe = async (title, rId, image, servings, readyInMinutes, sourceUrl) => {
        console.log(title, rId, image, servings, readyInMinutes, sourceUrl);
        fetch("http://localhost:3000/recipe/create", {

            method: "POST",
            headers: {
                'Authorization': props.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                rId: rId,
                image: image,
                servings: servings,
                readyInMinutes: readyInMinutes,
                sourceUrl: sourceUrl
            })
        })
            .then(res => { console.log(res) })
            .catch(err => console.log(err))
    }

    return (
        <StyledOutterDiv>
            <StyledH1>Search for a Recipe</StyledH1>
            <h3>Lookup by ingredients and diet: <input onChange={(e) => setUserSearch(e.target.value)}></input></h3>
            <StyledButton onClick={() => recipeSearch()}>Submit</StyledButton>
            <br></br>


            <div>{recipes?.map((rec) => {
                return (
                    <div>
                        <Card>
                            <CardImg width="50px" height="1000px" src={rec.image} alt="Recipe Image" />
                            <CardBody>
                                <CardTitle><h4 key={rec.id}>{rec.title}</h4></CardTitle>
                                {/* <CardSubtitle tag="h6" className="mb-2 text-muted">{full_info.servings}</CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">{full_info.readyInMinutes}</CardSubtitle>
                                <CardText>{full_info.sourceUrl}</CardText> */}

                                <StyledButton onClick={async (e) => {
                                    e.preventDefault();
                                    let full_info = await recipeDetailFetch(rec.id);
                                    console.log(rec, full_info);
                                    sendRecipe(rec.title, rec.id, rec.image, full_info.servings, full_info.readyInMinutes, full_info.sourceUrl)
                                }}>Save Recipe</StyledButton>

                            </CardBody>
                        </Card>
                    </div>
                )
            })}</div>

        </StyledOutterDiv>
    )
}
export default SearchView;


