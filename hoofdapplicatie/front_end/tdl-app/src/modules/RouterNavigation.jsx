
import { Route, Routes } from "react-router-dom";
import AppNavigation from "./standard_modules/App-Navigation";


export default function RouterNavigation() {
  return (
    <Routes>
      <Route exact path="/todos" element={<AppNavigation/>}/>
      <Route exact path="/appointments" element={<AppNavigation/>}/>
    </Routes>
  );
}
