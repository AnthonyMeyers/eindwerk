import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { loadCategories, loadPriorities } from '../../data/general';
import { useGetAllCategoriesQuery, useGetAllPrioritiesQuery } from '../../data/todoApi';

const SplashScreen = () => {
  //Set states
  const dispatch = useDispatch();
  const [hasLoaded, setHasLoaded] = useState(false);
  const nav = useNavigate();
  const [error, setError] = useState(false);

  const {data: categories, isLoading: isLoadingCat, isError: isErrorCat, isSuccess: isSuccessCat} = useGetAllCategoriesQuery();
  const {data: priorities, isLoading: isLoadingPty, isError: isErrorPty, isSuccess: isSuccessPty} = useGetAllPrioritiesQuery();


  //Set basic data in generalSlice
  useEffect(()=>{
    if(isSuccessCat && isSuccessPty){
      dispatch(loadCategories({categories}));
      dispatch(loadPriorities({priorities}));
      nav("/todos");
    }
    if(isErrorCat & isErrorPty){
      setError(true);}
    },[isSuccessPty, isSuccessPty]
  )

  return (
  <>
  <h1>Welcome to The To Do List application</h1>
  {error && <p>The application could not be loaded</p>}
    </>
  )
}

export default SplashScreen