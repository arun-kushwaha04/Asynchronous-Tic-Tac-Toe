import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ProtectedRoute = ({ componentToPass }) => {
 const navigate = useNavigate();
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
  const checkUserToken = () => {
   const userToken = localStorage.getItem('userToken');
   if (!userToken || userToken === 'undefined') {
    setIsLoggedIn(false);
    return navigate('/');
   }
   setIsLoggedIn(true);
  };
  checkUserToken();
 }, [isLoggedIn, navigate]);
 return <div>{componentToPass}</div>;
};
export default ProtectedRoute;
