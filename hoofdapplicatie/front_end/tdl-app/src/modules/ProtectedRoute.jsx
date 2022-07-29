import { useTimeExpiredLogout } from "../customhooks/useLogout";

const ProtectedRoute = ({ children }) => {
  //Get expiration logout function
  const expiredLogout = useTimeExpiredLogout();
  //Get the userId from localstorage and watch it starting when the user goes trough login, if no id or id not numeric, back to login page
  const userId = localStorage.getItem("userId");
  const time = new Date(localStorage.getItem("time"));
  const now = new Date();

  //Inlogtijd laten verlopen na een 50 min, server stopt token na 60 min
  const useTime = 50 * 60 * 1;

  if (!userId || userId === isNaN || time.getTime() + useTime < now.getTime()) {
    expiredLogout();
  }

  return children;
};

export default ProtectedRoute;
