
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
      <Route exact path="/" element={<IndexHeader/>}/>
      <Route exact path="/register" element={<IndexHeader/>}/>
      <Route exact path="/login" element={<IndexHeader/>}/>
      <Route exact path="/photogallery" element={<IndexHeader/>}/>
      <Route exact path="/todos" element={<AppHeaderTodos/>}/>
      <Route exact path="/appointments" element={<AppHeaderAppointments/>}/>
      <Route exact path="/phonebook" element={<PhonebookHeader/>}/>
      <Route exact path="/profile" element={<ProfileHeader/>}/>
    </Routes>
  );
}
