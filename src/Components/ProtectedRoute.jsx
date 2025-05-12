import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { ClipLoader } from 'react-spinners';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      setIsAuthorized(false);
      navigate('/login', { replace: true });
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, [navigate]);

  if (isLoading || !isAuthorized) {
    return <div className="min-h-[700px] flex justify-center items-center"><ClipLoader size={40} color={'#337E66'}/></div>
  }

  return children;
};

export default ProtectedRoute;