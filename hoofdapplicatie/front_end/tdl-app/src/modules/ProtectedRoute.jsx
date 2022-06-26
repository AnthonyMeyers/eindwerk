import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  cleanCategories,
  cleanPriorities,
  cleanUserdata,
} from "../data/general";
import { setmessage } from "../data/message";
import { destroyJWTCookie } from "../helpers/jwttokens";

const ProtectedRoute = ({ children }) => {
  //Get navigate & dispatch
  const nav = useNavigate();
  const dispatch = useDispatch();
  //Get the userId from localstorage and watch it starting when the user goes trough login, if no id or id not numeric, back to login page
  const userId = localStorage.getItem("userId");
  const time = new Date(localStorage.getItem("time"));
  const now = new Date();

  //Inlogtijd laten verlopen na een 50 min, server stopt token na 60 min
  const useTime = 50 * 60 * 1000;

  if (!userId || userId === isNaN || time.getTime() + useTime < now.getTime()) {
    dispatch(cleanCategories());
    dispatch(cleanPriorities());
    dispatch(cleanUserdata());
    dispatch(setmessage({ message: "Your session has expired." }));
    destroyJWTCookie();
    localStorage.clear();
    setTimeout(() => {
      return nav("/login");
    });
  }

  return children;
};

export default ProtectedRoute;
