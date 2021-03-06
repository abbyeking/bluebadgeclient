import { useState, useEffect } from 'react'
import StyledButton from './Styles/Button'
import StyledH1 from './Styles/StyledH1'
import StyledOutterDiv from './Styles/StyledOutterDiv'
import APIURL from '../helpers/environment'


const SearchView = (props) => {
    const [recipes, setRecipes] = useState([])
    const [userSearch, setUserSearch] = useState()

    const getRecipesByQuery = async (q) => {
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=d0ef56ca93554a3ba80bc1b25e91edc3&query=${q}`
        let response = await fetch(url)
        let dan = await response.json()
        return dan.results
    }
    const recipeSearch = async () => {
        let qResult = await getRecipesByQuery(userSearch)
        setRecipes(qResult)
    }

    useEffect(()=>{
    },[userSearch])

    const sendRecipe = async (title, rId) => {
        fetch(`${APIURL}/recipe/create`, {

            method: "POST",
            headers: {
                'Authorization': props.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                    title: title,
                    rId: rId
                
            })
        })
            .then(res => { console.log(res) })
            .catch(err => console.log(err))
    }

    return (
        <StyledOutterDiv>
            <StyledH1>Search for a Recipe</StyledH1>
            <h3>Lookup by ingredients and diet: <input onChange={(e) => setUserSearch(e.target.value)}></input></h3>
            <StyledButton onClick={recipeSearch}>Submit</StyledButton>
            <br></br>


            {recipes?.map((rec) => {
                return (
                    <div>
                        <h4 key={rec.id}>{rec.title} <i>{rec.maxReadyTime}</i></h4>
                        <StyledButton onClick={(e) => {
                            e.preventDefault();
                            sendRecipe(rec.title, rec.id)
                        }}>Save Recipe</StyledButton>
                    </div>
                )
            })}

        </StyledOutterDiv>
    )
}
export default SearchView;
