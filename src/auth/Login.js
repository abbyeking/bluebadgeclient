import React, { useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [noEmail, setNoEmail] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(email){
      
      fetch('http://localhost:3000/user/login', 
        {
          method: 'POST',
          body: JSON.stringify({user: {email: email, password: password}}),
          headers: new Headers({'Content-Type': 'application/json'})
        }
      )
      .then(
        (response) => {
          console.log(response)
          return response.json()
        })
      .then(
        (data) => {
          console.log(data.sessionToken)
          
          props.updateToken(data.sessionToken);
        }
      )
    }else{
      setNoEmail(true);
    }

  }

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
      <FormGroup>
          <Label htmlFor='email'>Email</Label>
          <Input onChange={(e)=>setEmail(e.target.value)} name='email' value={email}/>
          <p> {(noEmail) ? "Valid email address is required" : ""}</p>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='password'>Password</Label>
          <Input onChange={(e)=>setPassword(e.target.value)} name='password' value={password}/>
        </FormGroup>
        <Button type='submit'>Login</Button>
      </Form>
    </div>
  );
};

export default Login;