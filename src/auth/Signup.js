import React, { useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [noUsername, setNoUsername] = useState(false);

let handleSubmit = (event) => {
  event.preventDefault();
  if(username){
    setNoUsername(false);
    console.log(username, password);
    fetch('http://localhost:3000/user/register',
      {
        method: 'POST',
        body: JSON.stringify({username:username, passwordhash:password}),
        headers: new Headers({'Content-Type': 'application/json'})
      }
    )
    .then(
      (response) => {
        console.log(response);
        return response.json()
      })
    .then(
      (data) => {
        props.updateToken(data.sessionToken)
      }
    )
  }else{
    setNoUsername(true);
  } 
}

  return (
    <div>
      <h1>Signup</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor='username'>Username</Label>
          <Input onChange={(e)=>setUsername(e.target.value)}name='username' value={username}/>
          <p> {(noUsername) ? "user name is required" : ""}</p>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='password'>Password</Label>
          <Input onChange={(e)=>setPassword(e.target.value)}name='password' value={password}/>
        </FormGroup>
        <Button type='submit'>Signup</Button>
      </Form>
    </div>
  );
};

export default Signup;