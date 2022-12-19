import React from 'react';
import styled from 'styled-components';

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
   <Button color='#F2C94C'>Login</Button>
   <Button color='#2F80ED'>Register</Button>
  </Wrapper>
 );
}

const Wrapper = styled.div`
 border: 2px solid black;
 border-radius: 2rem;
 margin: 2rem auto 2rem auto;
 display: flex;
 padding: 1rem;
 flex-direction: column;
 height: 90vh;
 aspect-ratio: 0.5;
`;

const Heading = styled.h3`
 font-family: 'Bilbo';
 font-size: ${(props) => props.fs};
 font-weight: 400;
 line-height: ${(props) => props.lh};
 letter-spacing: 0em;
 text-align: center;
`;

const Button = styled.div`
 width: 90%;
 margin: 1rem auto;
 font-size: 1.4rem;
 line-height: 1.4rem;
 text-align: center;
 color: white;
 height: 5.6rem;
 border-radius: 0.5rem;
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 background-color: ${(props) => props.color};
`;
