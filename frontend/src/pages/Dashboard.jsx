import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Button, Wrapper } from '../styles/styledCompnets';

export default function Dashboard() {
 return (
  <Wrapper>
   <PageHeading>Your Games</PageHeading>
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
