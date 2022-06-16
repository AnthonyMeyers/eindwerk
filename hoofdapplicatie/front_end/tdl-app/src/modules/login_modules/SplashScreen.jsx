import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { loadCategories, loadPriorities } from '../../data/general';
import { useGetAllCategoriesQuery, useGetAllPrioritiesQuery } from '../../data/todoApi';
import { parseCookies } from 'nookies';

const SplashScreen = () => {
  const {jwt_token_TDL: token} = parseCookies();

  //Set states
  const dispatch = useDispatch();
  const [hasLoaded, setHasLoaded] = useState(false);
  const nav = useNavigate();
  const [error, setError] = useState(false);
  const {jwt_token_TDL} = parseCookies();
  const {data: categories, isLoading: isLoadingCat, isError: isErrorCat, isSuccess: isSuccessCat} = useGetAllCategoriesQuery(token);
  const {data: priorities, isLoading: isLoadingPty, isError: isErrorPty, isSuccess: isSuccessPty} = useGetAllPrioritiesQuery(token);

  //Set basic data in generalSlice
  useEffect(()=>{
    console.log(priorities);
    if(isSuccessCat && isSuccessPty && jwt_token_TDL){
      setTimeout(()=>{
        dispatch(loadCategories({categories}));
        dispatch(loadPriorities({priorities}));
        nav("/todos")
      },1000)
    }
    if(isErrorCat & isErrorPty){
      setError(true);}
    },[isSuccessPty, isSuccessPty,jwt_token_TDL]
  )

  return (
  <>
  <h1>Welcome to The To Do List application</h1>
  {error && <p>The application could not be loaded</p>}
    </>
  )
}

export default SplashScreen