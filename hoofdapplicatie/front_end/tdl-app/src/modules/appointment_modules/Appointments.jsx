import { useState } from "react";
import {
  useGetAllUserAppointmentsQuery,
  useGetAllUserContactsIndexedQuery,
} from "../../data/todoApi";
import Status from "../standard_modules/App-Status";
import Appointment from "./Appointment";
import { parseCookies } from "nookies";
import IndexFooter from "../standard_modules/Footer";

const Appointments = () => {
  //Get jwt token
  const { jwt_token_TDL: token } = parseCookies();
  //Get user id from localstorage
  const userId = localStorage.getItem("userId");

  //Usestates
  const [clickedItem, setClickedItem] = useState("");

  //Get data from queries
  const { data: allContacts } = useGetAllUserContactsIndexedQuery({
    id: userId,
    token,
  });

  const {
    data: allUserAppointments,
    isLoading: appointmentsLoading,
    isError: appointmentsError,
  } = useGetAllUserAppointmentsQuery({ id: userId, token });

  //Give target to child component for selection form field
  function handleAppointmentsClick(e) {
    setClickedItem(e.target);
  }

  return (
    <>
      <section
        className="container appointments"
        onClick={handleAppointmentsClick}
      >
        <h2 className="appointments__title">Appointments</h2>
        <Status isLoading={appointmentsLoading} isError={appointmentsError} />
        {allUserAppointments && allUserAppointments.length > 0 && (
          <ul className="appointments__list">
            {allUserAppointments.map((appointment) => (
              <li className="appointments__list__item" key={appointment.id}>
                <Appointment
                  appointment={appointment}
                  contacts={allContacts}
                  activeItem={clickedItem}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
      <IndexFooter />
    </>
  );
};

export default Appointments;
