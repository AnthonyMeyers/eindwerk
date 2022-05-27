import React from "react";
import { Route, Routes } from "react-router-dom";
import AppHeader from "./standard_modules/App-header";
import Todo_list from "./todo_modules/Todo_list";
import Login from "./login_modules/Login";
import Register from "./login_modules/Register";

export default function Routing() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route path="/todos" element={<AppHeader />} />
    </Routes>
  );
}
