// logoutUtility.js
import { useNavigate } from 'react-router-dom';

const useLogoutUtility = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // logout();
    navigate('/login');
  };

  return handleLogout;
};

export default useLogoutUtility;
