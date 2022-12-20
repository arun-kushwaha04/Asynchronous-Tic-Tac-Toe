import React, { useState } from 'react';
import styled from 'styled-components';

import {
 Button,
 Wrapper,
 Label,
 Input,
 FormField,
 ToastMessage,
} from '../styles/styledCompnets';
import Nav from '../components/Nav';
import { REGISTRATION_URL } from '../utilies';

export default function Register() {
 const [modalState, updateModalState] = useState({
  message: null,
  visible: false,
  color: '#6FCF97',
 });

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   updateModalState(() => {
    return {
     message: 'Registering ....',
     visible: true,
     color: '#6FCF97',
    };
   });
   const userData = JSON.stringify({
    name: e.target[0].value,
    userName: e.target[1].value,
    email: e.target[2].value,
    password: e.target[3].value,
   });
   const res = await fetch(REGISTRATION_URL, {
    method: 'POST',
    body: userData,
    headers: {
     'Content-Type': 'application/json',
    },
   });
   const data = await res.json();

   if (data.status === 200) {
    updateModalState(() => {
     return {
      message: 'Congratulations!!! Account created.',
      visible: true,
      color: '#6FCF97',
     };
    });
   } else {
    updateModalState(() => {
     return {
      message: data.message,
      visible: true,
      color: '#EB5757',
     };
    });
    setTimeout(() => {
     updateModalState(() => {
      return {
       message: null,
       visible: false,
       color: null,
      };
     });
    }, 5000);
   }
  } catch (error) {
   console.log(error);
   updateModalState(() => {
    return {
     message: 'OOPS!!! Some error ocurred',
     visible: true,
     color: '#EB5757',
    };
   });
   setTimeout(() => {
    updateModalState(() => {
     return {
      message: null,
      visible: false,
      color: null,
     };
    });
   }, 5000);
  }
  return;
 };
 return (
  <Wrapper>
   <Nav />
   <Header>
    <h4>Create account</h4>
    <h2>Let's get to know you better!</h2>
   </Header>
   <Form onSubmit={(e) => handleSubmit(e)} action='submit'>
    <FormField>
     <Label>Name</Label>
     <Input placeholder='Type your name here' type='text' required />
    </FormField>
    <FormField>
     <Label>Username</Label>
     <Input placeholder='Type your username here' type='text' required />
    </FormField>
    <FormField>
     <Label>Email</Label>
     <Input placeholder='Type your email here' type='email' required />
    </FormField>
    <FormField>
     <Label>Password</Label>
     <Input placeholder='Type of password here' type='password' required />
    </FormField>
    {modalState.visible && (
     <ToastMessage color={modalState.color}>{modalState.message}</ToastMessage>
    )}
    <Button
     color={!modalState.visible ? '#F2C94C' : '#E0E0E0'}
     type='submit'
     disabled={modalState.visible}
    >
     Register
    </Button>
   </Form>
  </Wrapper>
 );
}

const Header = styled.header`
 width: 100%;
 text-align: left;
 h4 {
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 1.5rem;
  color: #333333;
 }

 h2 {
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.5rem;
  letter-spacing: -0.05em;
  color: #333333;
 }
`;
const Form = styled.form`
 width: 100%;
 padding: 1rem 0;
 display: flex;
 flex-direction: column;
 gap: 0.5rem;
`;
