import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
 Button,
 Wrapper,
 Label,
 Input,
 FormField,
 ToastMessage,
} from '../styles/styledCompnets';
import Nav from '../components/Nav';
import { START_NEW_GAME } from '../utils/utilies';
import { addGameData } from '../store/gameSlice';

export default function NewGame() {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const authData = useSelector((state) => state.authReducer);
 const [modalState, updateModalState] = useState({
  message: null,
  visible: false,
  color: '#6FCF97',
 });

 const handleSubmit = async (e) => {
  e.preventDefault();
  updateModalState(() => {
   return {
    message: 'Finding User',
    visible: true,
    color: '#6FCF97',
   };
  });
  console.log(authData);
  if (authData.userData.email === e.target[0].value) {
   updateModalState({
    visible: false,
    color: '#6FCF97',
    message: null,
   });
   return;
  }
  const userData = JSON.stringify({
   player1: authData.userData.email,
   player2: e.target[0].value,
  });
  const res = await fetch(START_NEW_GAME, {
   method: 'POST',
   body: userData,
   headers: {
    'Content-Type': 'application/json',
    Authorization: `${localStorage.getItem('userToken')}`,
   },
  });

  const data = await res.json();

  if (data.status === 200) {
   updateModalState({
    message: 'New game created',
    visible: true,
    color: '#6FCF97',
   });
   dispatch(addGameData(data.payload));
   navigate(`/play/${data.payload._id}`);
  } else {
   updateModalState({
    message: 'User not found',
    visible: true,
    color: '#EB5757',
   });
   setTimeout(() => {
    updateModalState({
     message: null,
     visible: false,
     color: '#EB5757',
    });
   }, 5000);
  }
 };
 return (
  <Wrapper>
   <Nav />
   <Header>
    <h4>Start a new game</h4>
    <h2>Whom do you want to play with?</h2>
   </Header>
   <Form onSubmit={(e) => handleSubmit(e)} action='submit'>
    <FormField>
     <Label>Email</Label>
     <Input placeholder='Type their email here' type='email' required />
    </FormField>
    {modalState.visible && (
     <ToastMessage color={modalState.color}>{modalState.message}</ToastMessage>
    )}
    <Button
     color={!modalState.visible ? '#F2C94C' : '#E0E0E0'}
     type='submit'
     disabled={modalState.visible}
     style={{ marginTop: 'auto' }}
    >
     Start Game
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
 flex-grow: 1;
`;
