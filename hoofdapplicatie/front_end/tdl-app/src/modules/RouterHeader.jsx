
import { Route, Routes } from "react-router-dom";
import AppHeaderAppointments from "./standard_modules/App-Header-Appointments";
import AppHeaderTodos from "./standard_modules/App-header-todos";


export default function RouterHeader() {
  return (
    <Routes>
      <Route exact path="/todos" element={<AppHeaderTodos/>}/>
      <Route exact path="/appointments" element={<AppHeaderAppointments/>}/>
    </Routes>
  );
}
