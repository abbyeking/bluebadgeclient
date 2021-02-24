import { useState, useEffect } from 'react'

const SearchView = () => {
    const [recipes, setRecipes] = useState([])
    const [title, setTitle] = useState([])
    const [id, setId] = useState([])
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
// {q.id}
    // useEffect(async () => {
    //     let query = 'pizza'
    //     let result = await getRecipesByQuery(query)
    //     console.log(result)
    //     setRecipes(result)
    // }, [])

    useEffect(()=>{
        console.log(userSearch)
    },[userSearch])

    const sendRecipe = async (title, id) => {
        fetch("http://localhost:3000/recipe/create", {

            method: "POST",
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipe: {
                    title: title,
                    id: id
                }
            })
        })
            .then(res => { console.log(res) })
            .catch(err => console.log(err))
    }

    return (
        <div>
            {/* <form>
                <input onChange={(e) => { setTitle(e.target.value) }} />
                <input onChange={(e) => { setId(e.target.value) }} />
                <button onClick={(e) => {
                    e.preventDefault();
                    sendRecipe()
                }}>Submit Form</button>
            </form> */}
            <h3>Lookup a recipe: <input onChange={(e) => setUserSearch(e.target.value)}></input></h3>
            <button onClick={recipeSearch}>Submit</button>


            {recipes?.map((rec) => {
                return (
                    <div>
                        <h4 key={rec.id}>{rec.title} <i>{rec.maxReadyTime}</i></h4>
                        <button onClick={(e) => {
                            e.preventDefault();
                            sendRecipe(rec.title, rec.url)
                        }}>Save Recipe</button>
                    </div>
                )
            })}
            {/* <form>
                <input onChange={(e) => { setTitle(e.target.value) }} />
                <input onChange={(e) => { setId(e.target.value) }} />
                <button onClick={(e) => {
                    e.preventDefault();
                    sendRecipe()
                }}>Submit Form</button>
            </form>  */}

        </div>
    )
}
export default SearchView;