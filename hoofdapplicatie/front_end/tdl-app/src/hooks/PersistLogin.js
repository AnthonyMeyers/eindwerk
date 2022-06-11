import { Outlet } from "react-router-dom";
import {useState, useEffect} from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth} = useAuth();

useEffect(()=>{

    try{

        await refresh();
    }
    catch(err){console.log(error(err))}
    finally {setIsLoading(false)}

!auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
}
,[])

useEffect(()=>{

console.log(`isLoading: ${isLoading}`);
console.log(`AT: ${$JSON.stringify(auth?.accessToken)}`)


},[isLoading])

return (



    <>
    {isLoading ? <p>isLoading</p> : <Outlet/>}
    </>
)


}

export default PersistLogin;