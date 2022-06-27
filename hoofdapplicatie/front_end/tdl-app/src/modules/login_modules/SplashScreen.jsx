import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  loadCategories,
  loadPriorities,
  loadUserdata,
} from "../../data/general";
import {
  useGetAllCategoriesQuery,
  useGetAllPrioritiesQuery,
  useGetAllUserInfoQuery,
} from "../../data/todoApi";
import { parseCookies } from "nookies";
import Status from "../standard_modules/App-Status";
import IndexFooter from "../standard_modules/Footer";

const SplashScreen = () => {
  //Get jwt token
  const { jwt_token_TDL: token } = parseCookies();

  //Get navigation in the fray
  const nav = useNavigate();

  //Set states
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const {
    data: categories,
    isLoading: isLoadingCat,
    isError: isErrorCat,
    isSuccess: isSuccessCat,
  } = useGetAllCategoriesQuery(token);
  const {
    data: priorities,
    isLoading: isLoadingPty,
    isError: isErrorPty,
    isSuccess: isSuccessPty,
  } = useGetAllPrioritiesQuery(token);
  const {
    data: userData,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    isSuccess: isSuccessUser,
  } = useGetAllUserInfoQuery({ id: userId, token });

  //Set basic data in generalSlice
  useEffect(() => {
    if (isSuccessCat && isSuccessPty && isSuccessUser) {
      dispatch(loadCategories({ categories }));
      dispatch(loadPriorities({ priorities }));
      dispatch(loadUserdata({ userData }));
      setLoading(false);
      nav("/todos");
    }
    if (isErrorCat & isErrorPty) {
      setLoading(false);
      setError(true);
    }
  }, [categories, priorities, userData]);

  return (
    <>
      <section className="splashscreen">
        <h1 className="splashscreen__title">
          Welcome to The To Do List application
        </h1>
        {!loading && !error && (
          <NavLink to="/todos" className="splashscreen__link">
            <button className="splashscreen__link__button btn btn-primary">
              Continue to my To Do List Application
            </button>
          </NavLink>
        )}
      </section>
      <Status isLoading={loading} isError={error} />
      <IndexFooter />
    </>
  );
};

export default SplashScreen;
