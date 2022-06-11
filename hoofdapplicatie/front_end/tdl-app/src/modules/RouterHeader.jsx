
import { Route, Routes } from "react-router-dom";
import AppHeaderAppointments from "./appointment_modules/App-Header-Appointments";
import AppHeaderTodos from "./todo_modules/App-header-todos";
import PhonebookHeader from "./phonebook_modules/Phonebook_header";

export default function RouterHeader() {
  return (
    <Routes>
      <Route exact path="/todos" element={<AppHeaderTodos/>}/>
      <Route exact path="/appointments" element={<AppHeaderAppointments/>}/>
      <Route exact path="/phonebook" element={<PhonebookHeader/>}/>
    </Routes>
  );
}
