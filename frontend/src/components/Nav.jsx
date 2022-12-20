import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import BackIcon from '../Left Icons.svg';

export default function Nav() {
 const navigate = useNavigate();
 return (
  <NavBar>
   <img src={BackIcon} alt='Go Back' onClick={() => navigate(-1)} />
  </NavBar>
 );
}
const NavBar = styled.nav`
 min-height: 3rem;
 width: 100%;
 text-align: left;
 display: flex;
 align-items: center;
 width: 100%;
 margin-bottom: 1rem;
 img {
  height: 1.5rem;
  width: auto;
  cursor: pointer;
 }
`;
