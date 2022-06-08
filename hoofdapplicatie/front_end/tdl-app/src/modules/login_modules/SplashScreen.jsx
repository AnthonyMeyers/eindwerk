import { useState,useEffect } from 'react';
import { Navigate } from 'react-router';
import { useGetAllCategoriesQuery, useGetAllPrioritiesQuery } from '../../data/todoApi';
import { useDispatch } from 'react-redux';
import { loadCategories, loadPriorities } from '../../data/general';


const SplashScreen = () => {
//Set states
const dispatch = useDispatch();
const [hasLoaded, setHasLoaded] = useState(false);
const [hasError, setHasError] = useState(false);

//Query data
const {data: categories, isLoading: isLoadingCat, isError: isErrorCat, isSuccess: isSuccessCat} = useGetAllCategoriesQuery();
const {data: priorities, isLoading: isLoadingPty, isError: isErrorPty, isSuccess: isSuccessPty} = useGetAllPrioritiesQuery();

//Alter states & generalSlice
useEffect(()=>{
  if(isSuccessCat && isSuccessPty){
dispatch(loadCategories({categories}));
dispatch(loadPriorities({priorities}));
setHasLoaded(true);
/*setTimeout(()=>{setHasLoaded(true);},1500)*/
}
},[isSuccessCat, isSuccessPty])
    const admin = true;
  return (
  <>
  <h1>Welcome to The To Do List application</h1>
    {hasLoaded && <Navigate replace to="/todos" />}
    {hasError && <p>The application could not be loaded</p>}
    </>
  )
}

export default SplashScreen