import React from "react";
import { Route, Routes } from "react-router-dom";
import Todo_list from "./todo_modules/Todo_list";
import Login from "./login_modules/Login";
import Register from "./login_modules/Register";
import SplashScreen from "./login_modules/SplashScreen";
import Appointments from "./appointment_modules/Appointments";
import Phonebook from "./phonebook_modules/Phonebook";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./login_modules/Home";
import Photogallery from "./login_modules/Photogallery";
import Profile from "./profile_modules/Profile";
import NotFound from "./standard_modules/NotFound";

export default function Routing() {
  return (
    <Routes>
      {/*Open routes */}
      <Route
        exact
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/login"}
        element={<Login />}
      />
      <Route
        exact
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/register"}
        element={<Register />}
      />
      <Route
        exact
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/"}
        element={<Home />}
      />
      <Route
        exact
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/photogallery"}
        element={<Photogallery />}
      />

      {/*Protected routes, only when user id known */}
      <Route
        exact
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/splashscreen"}
        element={
          <ProtectedRoute>
            <SplashScreen />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/todos"}
        element={
          <ProtectedRoute>
            <Todo_list />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/appointments"}
        element={
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/phonebook"}
        element={
          <ProtectedRoute>
            <Phonebook />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/profile"}
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ROUTE NOT FOUND*/}
      <Route
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/*"}
        element={<NotFound />}
      />
    </Routes>
  );
}
