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
import xPiece from '../xPiece.svg';
import oPiece from '../oPiece.svg';

export default function Play() {
 const [modalState, updateModalState] = useState({
  message: null,
  visible: false,
 });

 const [gameState, updateGameState] = useState({
  block1: 0,
  block2: 1,
  block3: 0,
  block4: 0,
  block5: 2,
  block6: 0,
  block7: 0,
  block8: 2,
  block9: 0,
 });
 const userNumber = 1;
 const handleSubmit = (e) => {
  e.preventDefault();
  updateModalState(() => {
   return {
    message: 'Submitting....',
    visible: true,
   };
  });

  console.log('Handle submit beign called');
  console.log(e);
 };
 const userClickHandler = (blockId) => {
  if (gameState[blockId] === 0) {
   updateGameState((oldState) => {
    return { ...oldState, [blockId]: userNumber };
   });
  } else {
   return;
  }
 };
 const renderElement = (blockState) => {
  return blockState === 0 ? (
   ''
  ) : blockState === 1 ? (
   <img
    src={userNumber === 1 ? xPiece : oPiece}
    alt={userNumber === 1 ? 'X piece on board' : 'O piece on board'}
   />
  ) : (
   <img
    src={userNumber === 2 ? xPiece : oPiece}
    alt={userNumber === 2 ? 'X piece on board' : 'O piece on board'}
   />
  );
 };
 return (
  <Wrapper>
   <Nav />
   <Header>
    <h2>Game With Tanmay</h2>
    <h4>Your Piece</h4>
    <img src={xPiece} alt="User's Piece" />
   </Header>
   <HeaderDiv>Your Move</HeaderDiv>
   <GameBox>
    <div className='block1 top left' onClick={() => userClickHandler('block1')}>
     {renderElement(gameState.block1)}
    </div>
    <div className='block2 top' onClick={() => userClickHandler('block2')}>
     {renderElement(gameState.block2)}
    </div>
    <div
     className='block3 top right'
     onClick={() => userClickHandler('block3')}
    >
     {renderElement(gameState.block3)}
    </div>
    <div className='block4 left' onClick={() => userClickHandler('block4')}>
     {renderElement(gameState.block4)}
    </div>
    <div className='block5' onClick={() => userClickHandler('block5')}>
     {renderElement(gameState.block5)}
    </div>
    <div className='block6 right' onClick={() => userClickHandler('block6')}>
     {renderElement(gameState.block6)}
    </div>
    <div
     className='block7 bottom left'
     onClick={() => userClickHandler('block7')}
    >
     {renderElement(gameState.block7)}
    </div>
    <div className='block8 bottom' onClick={() => userClickHandler('block8')}>
     {renderElement(gameState.block8)}
    </div>
    <div
     className='block9 bottom right'
     onClick={() => userClickHandler('block9')}
    >
     {renderElement(gameState.block9)}
    </div>
   </GameBox>

   {modalState.visible && (
    <ToastMessage color='#6FCF97'>{modalState.message}</ToastMessage>
   )}
   <Button
    color={!modalState.visible ? '#F2C94C' : '#E0E0E0'}
    disabled={modalState.visible}
    style={{ marginTop: 'auto' }}
   >
    Submit!
   </Button>
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
 img {
  width: 3rem;
  height: auto;
  object-fit: cover;
 }
`;
const GameBox = styled.div`
 display: grid;
 width: 100%;
 grid-template-columns: 1fr 1fr 1fr;
 margin-bottom: 1rem;
 div {
  border: 3px solid #fee69e;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 6rem;
  cursor: pointer;
 }
 .top {
  border-top: none;
 }
 .right {
  border-right: none;
 }
 .left {
  border-left: none;
 }
 .bottom {
  border-bottom: none;
 }
 img {
  width: auto;
  height: 100%;
  object-fit: cover;
 }
`;

const HeaderDiv = styled.div`
 width: 100%;
 height: 4rem;
 background: #ffe79e;
 font-family: 'Work Sans';
 font-style: normal;
 font-weight: 400;
 font-size: 1.5rem;
 line-height: 2rem;
 color: #212121;
 display: flex;
 align-items: center;
 justify-content: center;
`;
