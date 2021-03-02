import {useState} from 'react'
const UpdateForm = ({userRecipe}) => {
    const [title, setTitle] = useState(userRecipe.title)
    const [recipeURL, setRecipeURL] = useState(userRecipe.url)
    const updateRecipe = () => {
        console.log(userRecipe.id, title, recipeURL )
        fetch(`http://localhost:3000/update/${userRecipe.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                recipeURL: recipeURL
            })
        })
    }
    const deleteRecipe = (id) => {
        fetch(`http://localhost:3000/delete/${id}`, {
            method: "DELETE"
        })
    }
    return (
        <div>
            <h3>Title: <input placeholder={userRecipe.title} onChange={e => setTitle(e.target.value)}/></h3>
            <h4>Url: <input placeholder={userRecipe.recipeURL} onChange={e => setRecipeURL(e.target.value)}/></h4>
            <button onClick={() => updateRecipe()}>Update Recipe Entry</button>
        </div>
    )
}
export default UpdateForm