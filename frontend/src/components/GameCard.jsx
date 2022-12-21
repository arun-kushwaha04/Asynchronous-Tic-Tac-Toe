import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Button } from '../styles/styledCompnets';
import { useDispatch } from 'react-redux';
import { addGameData } from '../store/gameSlice';

export default function GameCard({ game, userEmail }) {
 const dispatch = useDispatch();

 const dateString = (ftime) => {
  const millisTime = parseInt(ftime);
  let dateString = new Date(millisTime).toDateString();
  let hourNotation = new Date(millisTime).toLocaleTimeString().split(' ')[1];
  let time =
   new Date(millisTime).toLocaleTimeString().split(':')[0] +
   ':' +
   new Date(millisTime).toLocaleTimeString().split(':')[1];
  dateString += ' ' + time + ' ' + hourNotation;
  return dateString;
 };
 const otherUserEmail =
  game.player1 === userEmail ? game.player2 : game.player1;

 const clickHandler = (data) => {
  dispatch(addGameData(data));
 };

 return (
  <GameDiv>
   <h3>Game with {game.userName}</h3>
   {game.gameFinished === true ? (
    game.gameWonBy === userEmail ? (
     <div>
      <h5>You Won!!</h5>
     </div>
    ) : game.gameWonBy === otherUserEmail ? (
     <div>
      <h5>You Lost</h5>
     </div>
    ) : (
     <div>
      <h5>It's a draw</h5>
     </div>
    )
   ) : game.nextMoveBy === userEmail ? (
    <div>
     <h5>
      {game.userName} just made their move! <br /> It's your turn to play now.
     </h5>
    </div>
   ) : (
    <div>
     <h5>
      You've made your move! <br /> Waiting for them.
     </h5>
    </div>
   )}

   <p>{dateString(game.lastModified)}</p>
   <Link to={`/play/${game._id}`} onClick={() => clickHandler(game)}>
    <Button color='#F2C94C'>
     {game.gameFinished === true
      ? 'View Game'
      : game.nextMoveBy === userEmail
      ? 'Play!'
      : 'View Game'}
    </Button>
   </Link>
  </GameDiv>
 );
}

const GameDiv = styled.div`
 display: flex;
 flex-direction: column;
 align-items: flex-start;
 padding: 1.6rem;
 gap: 1rem;
 background: #ffffff;
 box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.25);
 border-radius: 0.8rem;

 h5,
 h4,
 h3 {
  margin-bottom: 0rem;
 }
 a {
  width: 100%;
 }
`;
