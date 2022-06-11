import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Todo_list from "./todo_modules/Todo_list";
import Login from "./login_modules/Login";
import Register from "./login_modules/Register";
import SplashScreen from "./login_modules/SplashScreen";
import Settings from "./extra_modules/Settings";
import Appointments from "./appointment_modules/Appointments";
import Phonebook from "./phonebook/Phonebook";

function requireAut()
{
  let location = useLocation();


}


export default function Routing() {
  return (
    <Routes>
      <Route exact path="/" element={<SplashScreen/>}/>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route element={<PersisLogin/>}>
      <Route exact path="/settings" element={<requireAut><Settings /></requireAut>} />
      <Route exact path="/todos" element={<requireAut><Todo_list /></requireAut>} />
      <Route exact path="/appointments" element={<requireAut><Appointments/></requireAut>}/>
      <Route exact path="/phonebook" element={<requireAut><Phonebook/></requireAut>}/>
      </Route>
    </Routes>
  );
}
