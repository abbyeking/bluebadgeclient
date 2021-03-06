import { useState, useEffect } from 'react'
import StyledButton from './Styles/Button'
import StyledH1 from './Styles/StyledH1'
import StyledOuterDiv from './Styles/StyledOuterDiv'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap'
import './Navbar.css'
import APIURL from '../helpers/environment'

const baseUrl = 'https://api.spoonacular.com/recipes/complexSearch'
const key = '6f3ea19c350c46fba6d62a182eb7770f'

const SearchView = (props) => {
    const [recipes, setRecipes] = useState([])
    const [userSearch, setUserSearch] = useState()

    const getRecipesByQuery = async (q) => {

        let url = `${baseUrl}?apiKey=${key}&query=${q}`

        let response = await fetch(url)
        let dan = await response.json()
        return dan.results
    }
    const recipeSearch = async () => {
        let qResult = await getRecipesByQuery(userSearch)
        setRecipes(qResult)
    }
    const recipeDetailFetch = async (rId) => {


        let res = await fetch(`https://api.spoonacular.com/recipes/${rId}/information?apiKey=6f3ea19c350c46fba6d62a182eb7770f`, {
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

  
        fetch(`${APIURL}/recipe/create`, {

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
            .then(res => { res.json()})
            .catch(err => console.log(err))
    }

    return (
        <StyledOuterDiv>
            <StyledH1>Search for a Recipe</StyledH1>
            <h3>Look up by ingredients and diet: <input onChange={(e) => setUserSearch(e.target.value)}></input></h3>
            <StyledButton onClick={() => recipeSearch()}>Submit</StyledButton>
            <br></br>
            <br />


            <div>{recipes?.map((rec) => {
                return (
                    <div>

                        <Row className="justify-content-md-center">
                            <Col xs={12} sm={4} md={4}>
                                <Card>
                                    <CardImg id="images" src={rec.image} alt="Recipe Image" />
                                    <CardBody>
                                        <CardTitle><h4 key={rec.id}>{rec.title}</h4></CardTitle>
                                        <StyledButton onClick={async (e) => {
                                            e.preventDefault();
                                            let full_info = await recipeDetailFetch(rec.id);
                                            console.log(rec, full_info);
                                            sendRecipe(rec.title, rec.id, rec.image, full_info.servings, full_info.readyInMinutes, full_info.sourceUrl)
                                        }}>Save Recipe</StyledButton>
                                    </CardBody>
                                </Card>
                                <br></br>
                            </Col>
                        </Row>

                    </div>
                )
            })}</div>

        </StyledOuterDiv>
    )
}
export default SearchView;


