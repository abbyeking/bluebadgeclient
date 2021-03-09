import React from 'react';
import { Container, Row, Col } from 'reactstrap'
import Signup from './Signup';
import Login from './Login';
import '../index.css';
import AuthMargin from '../components/Styles/AuthMargin'

const Auth = (props) => {

  return (
    <div>
      <br></br>
      <Container className='auth-container'>
        <Row>
          <Col md="6">
            <AuthMargin>
              <Signup updateToken={props.updateToken} />
            </AuthMargin>
          </Col>
          <Col md="6" className='login-col'>
            <AuthMargin>
              <Login updateToken={props.updateToken} />
            </AuthMargin>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Auth;