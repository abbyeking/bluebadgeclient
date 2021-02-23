import React from 'react';
import {Table, Button} from 'reactstrap';

const RecipeTable = (props) => {

    const deleteRecipe = (recipe) => {
        fetch(`http://localhost:3000/log/${recipe.rId}` , {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(() => props.fetchRecipes())
    }


    const RecipeMapper = () => {
        return props.recipes.map((recipe,index) => {
            return(
                <tr key = {index}>
                    <th scope = "row">{recipe.rId}</th>
                    <td>{recipe.rating}</td>
                    <td>{recipe.entry}</td>
                    <td>
                        <Button color="warning" onClick= {() => {props.editUpdateRecipe(recipe); props.updateOn()}}>Update</Button>
                        <Button color="danger" onClick={() => {deleteRecipe(recipe)}}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }

    return (
    <>
        <h3>Recipe</h3>
        <hr />
        <Table striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Result</th>
                    <th>Description</th>
                    <th>Definition</th>
                </tr>
            </thead>
            <tbody>
                {RecipeMapper()}
            </tbody>
        </Table>
    </>
    )
}

export default RecipeTable;


