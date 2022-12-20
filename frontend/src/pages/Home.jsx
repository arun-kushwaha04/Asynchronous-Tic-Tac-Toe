import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Button, Wrapper } from '../styles/styledCompnets';

export default function Home() {
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
   <div className='button-div' style={{ alignSelf: 'flex-end', width: '100%' }}>
    <Button color='#F2C94C'>
     <Link to={'/login'}>Login</Link>
    </Button>
    <Button color='#2F80ED'>
     <Link to={'/register'}>Register</Link>
    </Button>
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
