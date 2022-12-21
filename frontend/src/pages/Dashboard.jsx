import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button, Wrapper } from '../styles/styledCompnets';
import { GET_ALL_GAME } from '../utilies';
import GameCard from '../components/GameCard';

export default function Dashboard() {
 const authData = useSelector((state) => state.authReducer);
 const [userGames, updateUserGames] = useState([]);
 useEffect(() => {
  const getUserGame = async () => {
   const userData = JSON.stringify({
    email: authData.userData.email,
   });
   const res = await fetch(GET_ALL_GAME, {
    method: 'POST',
    body: userData,
    headers: {
     'Content-Type': 'application/json',
    },
   });
   const data = await res.json();
   console.log(data);
   updateUserGames(data.payload);
  };
  getUserGame();
 }, [authData.userData.email]);

 return (
  <Wrapper>
   <PageHeading>Your Games</PageHeading>

   {userGames.length === 0 ? (
    <div
     className='heading-div'
     style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 1,
      position: 'relative',
     }}
    >
     {' '}
     <Heading fs='5rem' lh='6rem'>
      No Games
     </Heading>
     <Heading fs='5rem' lh='6rem'>
      Found
     </Heading>
     <Link to={'/newGame'}>
      <Button color='#F2C94C'>Start a new game</Button>
     </Link>
    </div>
   ) : (
    <div
     className='heading-div'
     style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      flex: 1,
      position: 'relative',
     }}
    >
     {userGames.map((game) => {
      return <GameCard game={game} userEmail={authData.userData.email} />;
     })}
    </div>
   )}
  </Wrapper>
 );
}

const Heading = styled.h3`
 font-family: 'Bilbo';
 font-size: ${(props) => props.fs};
 font-weight: 400;
 line-height: ${(props) => props.lh};
 letter-spacing: 0em;
 text-align: center;
`;

const PageHeading = styled.h4`
 font-family: 'Epilogue';
 font-style: normal;
 font-weight: 700;
 font-size: 2rem;
 line-height: 2.5rem;
 color: #333333;
`;
