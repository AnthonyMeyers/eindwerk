import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Todo_list from "./todo_modules/Todo_list";
import Login from "./login_modules/Login";
import Register from "./login_modules/Register";
import SplashScreen from "./login_modules/SplashScreen";
import Settings from "./extra_modules/Settings";
import Appointments from "./appointment_modules/Appointments";
import Phonebook from "./phonebook_modules/Phonebook";

export default function Routing() {
  return (
    <Routes>
      
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/splashscreen" element={<SplashScreen/>}/>
      <Route exact path="/settings" element={<Settings />} />
      <Route exact path="/todos" element={<Todo_list />} />
      <Route exact path="/appointments" element={<Appointments/>}/>
      <Route exact path="/phonebook" element={<Phonebook/>}/>

    </Routes>
  );
}
