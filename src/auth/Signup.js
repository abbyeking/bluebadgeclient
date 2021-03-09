import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import styled from 'styled-components';
import StyledButton from '../components/Styles/Button'
import APIURL from '../helpers/environment'

const Signup = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [noPass, setNoPass] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);


  let handleSubmit = (event) => {
    event.preventDefault();
    let R = new RegExp(/[^@]+@[^@]+\.[^@]+/g);
    if (!R.test(email)) {
      setWrongEmail(true)
      console.log("hello", email, wrongEmail)
    }
    if (wrongEmail) {
      if (password.length > 4 && password.length < 14) {
        setNoPass(false);
        console.log(email, password);
        fetch(`${APIURL}/user/signup`,
          {
            method: 'POST',
            body: JSON.stringify({ user: { email: email, password: password } }),
            headers: new Headers({ 'Content-Type': 'application/json' })
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
            }
          )
      } else {
        setNoPass(true);
      }
    } else {
      (console.log("please correct email format"))
    }
  }



  return (
    <div>
      <h1>Signup</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor='email'>Email</Label>
          <Input required onChange={(e) => setEmail(e.target.value)} email='email' value={email} />
          <p style={{ color: "red" }} > {(wrongEmail) ? "Email is invalid" : ""}</p>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='password'>Password</Label>
          <Input required onChange={(e) => setPassword(e.target.value)} name='password' value={password} />
          <p style={{ color: "red" }} > {(noPass) ? "Password must be between 4 and 13 characters" : ""}</p>
        </FormGroup>
        <StyledButton type='submit'>Signup</StyledButton>
      </Form>
    </div>
  );
};

export default Signup;

