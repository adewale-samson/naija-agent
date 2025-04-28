import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  
  const [isAuthorized, setIsAuthorized] = useState(false)
  
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
    }
    setIsAuthorized(true)
  }, []);


  if(!isAuthorized){
    return null
  } 
  return children;
};

export default ProtectedRoute;