import React from "react";
import { Route, Routes } from "react-router-dom";
import Todo_list from "./todo_modules/Todo_list";
import Login from "./login_modules/Login";
import Register from "./login_modules/Register";
import SplashScreen from "./login_modules/SplashScreen";
import Settings from "./extra_modules/Settings";
import Appointments from "./appointment_modules/Appointments";

export default function Routing() {
  return (
    <Routes>
      <Route exact path="/" element={<SplashScreen/>}/>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/settings" element={<Settings />} />
      <Route exact path="/todos" element={<Todo_list />} />
      <Route exact path="/appointments" element={<Appointments/>}/>
    </Routes>
  );
}
