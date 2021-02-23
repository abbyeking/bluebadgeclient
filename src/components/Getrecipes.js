import { useState, useEffect } from 'react'

const GetRecipes = () => {
    const [recipes, setRecipes] = useState([])
    const [title, setTitle] = useState([])
    const [id, setId] = useState ([])

    useEffect(async () => {
        let query = 'pizza'
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=d0ef56ca93554a3ba80bc1b25e91edc3&query=${query}`
        let response = await fetch(url)
        let dan = await response.json()
        setRecipes(dan)
        console.log(dan)
    }, [])
   
    const sendRecipe = async(title, url) => {
        fetch("http://localhost:3000/recipe/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipe: {
                    title: title,
                    id: id
                }
            })
        
            .then(res => { console.log(res) })
            .catch(err => console.log(err))
        })}
    return (
        <div>
            {recipes.map((rec) => {
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
                <input onChange={(e) => { setUrl(e.target.value) }} />
                <button onClick={(e) => {
                    e.preventDefault();
                    sendRecipe()
                }}>Submit Form</button>
            </form> */}
            
        </div>
    )
}
export default GetRecipes;