import React, { useState, useEffect } from 'react';
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
import xPiece from '../xPiece.svg';
import oPiece from '../oPiece.svg';
import { addGameData } from '../store/gameSlice';
import { UPDATE_GAME_STATUS } from '../utils/utilies';

export default function Play() {
 const navigate = useNavigate();
 const gameData = useSelector((state) => state.gameReducer);
 const userEmail = useSelector((state) => state.authReducer).userData.email;
 const userNumber = gameData.player1 === userEmail ? 1 : 2;
 const otherUserEmail =
  gameData.player1 === userEmail ? gameData.player2 : gameData.player1;

 const dispatch = useDispatch();
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

 useEffect(() => {
  updateGameState(gameData.gameState);
 }, [gameData.gameState]);

 const [currentMoveState, updateCurrentMoveState] = useState({
  isMoveMade: false,
  moveMadeAt: null,
 });

 const handleSubmit = async (e) => {
  e.preventDefault();
  updateModalState(() => {
   return {
    message: 'Submitting....',
    visible: false,
    color: '#6FCF97',
   };
  });

  try {
   const updatedGame = checkForWin(
    gameState,
    userNumber,
    userEmail,
    otherUserEmail,
   );
   let newGameData = { ...gameData };
   newGameData.gameState = gameState;
   newGameData.gameFinished = updatedGame.gameFinished;
   newGameData.gameWonBy = updatedGame.gameWonBy;
   newGameData.nextMoveBy = otherUserEmail;
   await dispatch(addGameData(newGameData));
   const userData = JSON.stringify({
    gameId: gameData._id,
    gameFinished: newGameData.gameFinished,
    nextMoveBy: newGameData.nextMoveBy,
    gameState: newGameData.gameState,
    gameWonBy: newGameData.gameWonBy,
   });
   const res = await fetch(UPDATE_GAME_STATUS, {
    method: 'POST',
    body: userData,
    headers: {
     'Content-Type': 'application/json',
    },
   });

   const data = res.json();

   if (data.status === 200) {
    navigate(0);
   } else {
    updateModalState(() => {
     return {
      message: 'Error saving game state',
      visible: true,
      color: '#EB5757',
     };
    });

    setTimeout(() => {
     navigate(-1);
    }, 2000);
   }
  } catch (error) {
   console.log(error);
   updateModalState(() => {
    return {
     message: 'Error saving game state',
     visible: true,
     color: '#EB5757',
    };
   });

   setTimeout(() => {
    navigate(-1);
   }, 2000);
  }
 };
 const userClickHandler = (blockId) => {
  if (gameData.gameFinished) return;
  if (
   gameData.nextMoveBy === userEmail &&
   gameState[blockId] === 0 &&
   currentMoveState.isMoveMade === false
  ) {
   updateGameState((oldState) => {
    return { ...oldState, [blockId]: userNumber };
   });
   updateCurrentMoveState({
    isMoveMade: true,
    moveMadeAt: blockId,
   });
  } else {
   if (currentMoveState.moveMadeAt === blockId) {
    updateGameState((oldState) => {
     return { ...oldState, [blockId]: 0 };
    });
    updateCurrentMoveState({
     isMoveMade: false,
     moveMadeAt: null,
    });
   }
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
    <h2>Game With {gameData.userName}</h2>
    <h4>Your Piece</h4>
    <img src={xPiece} alt="User's Piece" />
   </Header>
   {gameData.gameFinished === true ? (
    <HeaderDiv>
     {gameData.gameWonBy === userEmail
      ? 'You won'
      : gameData.gameWonBy === otherUserEmail
      ? 'You lost'
      : "It's a draw"}
    </HeaderDiv>
   ) : (
    <HeaderDiv>
     {gameData.nextMoveBy === userEmail ? 'Your' : 'Their'} Move
    </HeaderDiv>
   )}

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
    <ToastMessage color={modalState.color}>{modalState.message}</ToastMessage>
   )}
   <Button
    color={
     !(
      !currentMoveState.isMoveMade ||
      gameData.nextMoveBy === otherUserEmail ||
      modalState.visible
     )
      ? '#F2C94C'
      : '#E0E0E0'
    }
    style={{ marginTop: 'auto' }}
    disabled={
     !currentMoveState.isMoveMade ||
     gameData.nextMoveBy === otherUserEmail ||
     modalState.visible
    }
    onClick={handleSubmit}
   >
    {gameData.nextMoveBy === otherUserEmail
     ? `Waiting for ${gameData.userName}`
     : 'Submit!'}
   </Button>
  </Wrapper>
 );
}
const checkForWin = (
 { block1, block2, block3, block4, block5, block6, block7, block8, block9 },
 userNumber,
 userEmail,
 otherUserEmail,
) => {
 //checking for verticlal line
 if (block1 === block2 && block1 === block3 && block1 !== 0) {
  if (userNumber === block1) {
   return {
    gameFinished: true,
    gameWonBy: userEmail,
   };
  } else {
   return {
    gameFinished: true,
    gameWonBy: otherUserEmail,
   };
  }
 }
 if (block4 === block5 && block4 === block6 && block4 !== 0) {
  if (userNumber === block4) {
   return {
    gameFinished: true,
    gameWonBy: userEmail,
   };
  } else {
   return {
    gameFinished: true,
    gameWonBy: otherUserEmail,
   };
  }
 }
 if (block7 === block8 && block7 === block9 && block7 !== 0) {
  if (userNumber === block7) {
   return {
    gameFinished: true,
    gameWonBy: userEmail,
   };
  } else {
   return {
    gameFinished: true,
    gameWonBy: otherUserEmail,
   };
  }
 }
 //checking for horizontal line
 if (block1 === block4 && block1 === block7 && block1 !== 0) {
  if (userNumber === block1) {
   return {
    gameFinished: true,
    gameWonBy: userEmail,
   };
  } else {
   return {
    gameFinished: true,
    gameWonBy: otherUserEmail,
   };
  }
 }
 if (block2 === block5 && block2 === block8 && block2 !== 0) {
  if (userNumber === block2) {
   return {
    gameFinished: true,
    gameWonBy: userEmail,
   };
  } else {
   return {
    gameFinished: true,
    gameWonBy: otherUserEmail,
   };
  }
 }
 if (block3 === block6 && block3 === block9 && block3 !== 0) {
  if (userNumber === block3) {
   return {
    gameFinished: true,
    gameWonBy: userEmail,
   };
  } else {
   return {
    gameFinished: true,
    gameWonBy: otherUserEmail,
   };
  }
 }
 //checking for diagnols
 if (block1 === block5 && block1 === block9 && block1 !== 0) {
  if (userNumber === block1) {
   return {
    gameFinished: true,
    gameWonBy: userEmail,
   };
  } else {
   return {
    gameFinished: true,
    gameWonBy: otherUserEmail,
   };
  }
 }
 if (block3 === block5 && block3 === block7 && block3 !== 0) {
  if (userNumber === block3) {
   return {
    gameFinished: true,
    gameWonBy: userEmail,
   };
  } else {
   return {
    gameFinished: true,
    gameWonBy: otherUserEmail,
   };
  }
 }
 if (
  block1 !== 0 &&
  block2 !== 0 &&
  block3 !== 0 &&
  block4 !== 0 &&
  block5 !== 0 &&
  block6 !== 0 &&
  block7 !== 0 &&
  block8 !== 0 &&
  block9 !== 0
 ) {
  return {
   gameFinished: true,
   gameWonBy: null,
  };
 }
 return {
  gameFinished: false,
  gameWonBy: null,
 };
};

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
