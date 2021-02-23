import { useState, useEffect } from 'react'

const Data = () => {
    const [recipes, setRecipes] = useState([])
    const [title,setTitle] = useState([])
    const [id,setId] = useState ([])

    useEffect(async () => {
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=d0ef56ca93554a3ba80bc1b25e91edc3&query=${query}`
        let response = await fetch(url)
        let json = await response.json()
        console.log(json)
        setRecipes(json)
    }, [])
    const sendForm = async() => {
        fetch("http://localhost:3000/recipe/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipe: {
                    title: formTitle,
                    id: formId
                }
            })
        })
            .then(res => { console.log(res) })
            .catch(err => console.log(err))
    }
    const sendRecipe = async(title, url) => {
        fetch("http://localhost:3000/recipe/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipe: {
                    title: title,
                    id: rId
                }
            })
        })
            .then(res => { console.log(res) })
            .catch(err => console.log(err))
    }
    return (
        <div>
            {recipes.map((recipe) => {
                return (
                    <div>
                    <h4 key={recipe.id}>{recipe.title} <i>{recipe.maxReadyTime}</i></h4>
                    <button onClick={(e) => {
                        e.preventDefault();
                        sendRecipe(recipe.title, recipe.url)
                    }}>Save Recipe</button>
                    </div>
                    )
            })}
            <form>
                <input onChange={(e) => { setFormTitle(e.target.value) }} />
                <input onChange={(e) => { setFormUrl(e.target.value) }} />
                <button onClick={(e) => {
                    e.preventDefault();
                    sendForm()
                }}>Submit Form</button>
            </form>
        </div>
    )
}
export default Data;