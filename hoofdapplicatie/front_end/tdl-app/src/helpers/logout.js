import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { destroyJWTCookie } from "./jwttokens";
import {
  cleanCategories,
  cleanPriorities,
  cleanUserdata,
} from "../data/general";
import { setmessage } from "../data/message";

//Custom hook for logout use, returns function for logout sequence
export function useLogout() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  return () => {
    dispatch(setmessage({ message: "You have successfully logged of." }));
    dispatch(cleanCategories());
    dispatch(cleanPriorities());
    dispatch(cleanUserdata());
    destroyJWTCookie();
    localStorage.clear();
    return nav("/login");
  };
}

export function useTimeExpiredLogout() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  return () => {
    dispatch(setmessage({ message: "You have successfully logged of." }));
    dispatch(cleanCategories());
    dispatch(cleanPriorities());
    dispatch(cleanUserdata());
    destroyJWTCookie();
    localStorage.clear();
    return nav("/login");
  };
}
