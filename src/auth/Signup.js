import React, { useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Signup = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [noEmail, setNoEmail] = useState(false);

let handleSubmit = (event) => {
  event.preventDefault();
  if(email){
    setNoEmail(false);
    console.log(email, password);
    fetch('http://localhost:3000/user/signup',
      {
        method: 'POST',
        body: JSON.stringify({user: {email: email, password: password}}),
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
        console.log(data);
        props.updateToken(data.sessionToken)
        // localStorage.setItem('token', newToken);
        
      }
    )
  }else{
    setNoEmail(true);
  } 
}

  return (
    <div>
      <h1>Signup</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor='email'>Email</Label>
          <Input onChange={(e)=>setEmail(e.target.value)}email='email' value={email}/>
          <p> {(noEmail) ? "Email is required" : ""}</p>
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