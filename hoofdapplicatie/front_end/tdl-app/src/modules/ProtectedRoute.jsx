import {
    Routes,
    Route,
    NavLink,
    Navigate,
    useNavigate,
  } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  //Get the userId from localstorage and watch it starting when the user goes trough login, if no id, back to login page
    const userId = localStorage.getItem("userId");

    if (!userId) {
      return <Navigate to="/login"/>;
    }
  
    return children;
}

export default ProtectedRoute