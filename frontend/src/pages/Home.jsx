import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Button, Wrapper } from '../styles/styledCompnets';

export default function Home() {
 const navigate = useNavigate();
 useEffect(() => {
  const checkUserToken = () => {
   const userToken = localStorage.getItem('userToken');
   if (!userToken || userToken === 'undefined') {
    return;
   } else {
    navigate('/dashboard');
   }
  };
  checkUserToken();
 }, [navigate]);
 return (
  <Wrapper>
   <div className='heading-div' style={{ padding: '10rem 0 2rem 0' }}>
    <Heading fs='3rem' lh='2rem'>
     async
    </Heading>
    <Heading fs='7rem' lh='8rem'>
     tic tac
    </Heading>
    <Heading fs='7rem' lh='8rem'>
     toe
    </Heading>
   </div>
   <div className='button-div' style={{ marginTop: 'auto' }}>
    <Link to={'/login'}>
     <Button color='#F2C94C'>Login</Button>
    </Link>
    <Link to={'/register'}>
     <Button color='#2F80ED'>Register</Button>
    </Link>
   </div>
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
