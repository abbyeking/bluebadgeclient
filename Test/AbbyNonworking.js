import { useEffect, useState } from "react";
import styled from 'styled-components';
import SearchView from "./SearchView";
const StyledContainer = styled.div`
`
const Favorites = ({setUserRecipe}) => {
    const [recipes, setRecipes] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/recipe/')
            .then(res => res.json())
            .then(json => {
                // setRecipes(json.recipes)
                // json.recipes.map(recipe => recipe.isUpdating = false)
                console.log(json.recipes)
            })
    }, [])
    const getRecipe = (title) => {
        console.log({title})
        fetch(`http://localhost:3000/recipe/`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipe: {
                    title: title
                }
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json.recipe)
                json.recipe.isUpdating = false
            })
    }
return(
    <StyledContainer>
            {/* <SearchView createRecipe={createRecipe} /> */}
            {/* <h1>You've landed on Favorites View</h1> */}
            {recipes.map(recipe => {
                return(
                    <div key = {recipe.id}>
                        <h3>{recipe.title}</h3>
                        <button onClick={() => setUserRecipe(recipe)}>Details</button>
                    </div>
                )
            })}
    </StyledContainer>
)
        }
export default Favorites;