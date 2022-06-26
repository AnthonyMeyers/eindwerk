import { Route, Routes } from "react-router-dom";
import AppHeaderAppointments from "./appointment_modules/App-Header-Appointments";
import AppHeaderTodos from "./todo_modules/App-header-todos";
import PhonebookHeader from "./phonebook_modules/Phonebook_header";
import IndexHeader from "./login_modules/IndexHeader";
import ProfileHeader from "./profile_modules/ProfileHeader";

export default function RouterHeader() {
  //Show these headers on these routes
  return (
    <Routes>
      <Route
        exact
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/register"}
        element={<IndexHeader />}
      />
      <Route
        exact
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/login"}
        element={<IndexHeader />}
      />
      <Route
        exact
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/photogallery"}
        element={<IndexHeader />}
      />
      <Route
        exact
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/todos"}
        element={<AppHeaderTodos />}
      />
      <Route
        exact
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/todos"}
        element={<IndexHeader />}
      />
      <Route
        exact
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/appointments"}
        element={<AppHeaderAppointments />}
      />
      <Route
        exact
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/phonebook"}
        element={<PhonebookHeader />}
      />
      <Route
        exact
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/profile"}
        element={<ProfileHeader />}
      />
      <Route
        exact
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/"}
        element={<IndexHeader />}
      />
      <Route
        exact
        path={import.meta.env.VITE_NAVLINK_STANDARD + "/*"}
        element={<IndexHeader />}
      />
    </Routes>
  );
}
