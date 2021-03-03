import React from 'react';
import {Button} from 'reactstrap';
import {useEffect, useState} from 'react';
import UpdateForm from './UpdateForm';

const DetailsView = ({ userRecipe, setUserRecipe}) => {
    console.log(userRecipe)
    const [toUpdate, setToUpdate] = useState(false)

    useEffect(()=>{
        setToUpdate(false)
    },[userRecipe])


const deleteRecipe = (title,rId) => {
    fetch (`http://localhost:3000/delete/${rId}` , {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            rId: rId
        })
    }).then(() => {
        console.log("Deleted Successfully");
        setUserRecipe()
        // getFavs()
    })

return(
    <div key={userRecipe.id}>
    {toUpdate 
    ? (
        <>
            <UpdateForm setToUpdate={setToUpdate} setUserRecipe={setUserRecipe} userRecipe={userRecipe}/>
        </>)
    : (
        <>
        <h3>{userRecipe.title}</h3>

        <Button onClick={() => setToUpdate(!toUpdate)}>Update</Button>
        <Button onClick={() => {
            // deleteRecipe()
        }}>Delete</Button>
        </>
    )}
</div>
 )  
} 
}


export default DetailsView;