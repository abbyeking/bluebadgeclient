import {useState} from 'react';

const UpdateForm = ({userRecipe}) => {
    const [title, setTitle] = useState(userRecipe.title)

    const updateRecipe = () => {
        console.log(userRecipe.id, title )
        fetch(`http://localhost:3000/update/${userRecipe.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
            })
        }).then(() => {
            let newRecipe = userRecipe
            newRecipe.title = title
        })
    }
    console.log(userRecipe)
    
    return (
        <div>
            <h3>Title: <input placeholder={userRecipe.title} onChange={e => setTitle(e.target.value)}/></h3>
            {/* <h4>Url: <input placeholder={userRecipe.recipeURL} onChange={e => setRecipeURL(e.target.value)}/></h4> */}
            <button onClick={() => updateRecipe()}>Update Recipe Entry</button>
            {/* <button onClick={() => setToUpdate(false)}>Cancel Update</button> */}
        </div>
    )
}
export default UpdateForm