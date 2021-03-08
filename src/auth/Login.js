import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../index.css';
import StyledButton from '../components/Styles/Button'


const Login = (props) => {
  // console.log(props)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [noEmail, setNoEmail] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email) {

      fetch('http://localhost:3000/user/login',
        {
          method: 'POST',
          body: JSON.stringify({ user: { email: email, password: password } }),
          headers: new Headers({ 'Content-Type': 'application/json' })
        }
      )
        .then(
          (response) => {
            console.log(response)
            return response.json()
          })
        .then(
          (data) => {
            props.updateToken(data.sessionToken);
            console.log(data.sessionToken)
          }
        )
        .catch((err) => console.log(err))
    } else {
      setNoEmail(true);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor='email'>Email</Label>
          <Input onChange={(e) => setEmail(e.target.value)} name='email' value={email} />
          <p> {(noEmail) ? "Valid email address is required" : ""}</p>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='password'>Password</Label>
          <Input onChange={(e) => setPassword(e.target.value)} name='password' value={password} />
        </FormGroup>
        <StyledButton type='submit'>Login</StyledButton>
      </Form>
    </div>
  );
};

export default Login;