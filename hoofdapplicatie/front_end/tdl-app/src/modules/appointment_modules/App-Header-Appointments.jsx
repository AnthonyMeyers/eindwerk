import { convertToAccurateDay } from "../../helpers/datehelpers";
import { useAddOneAppointmentMutation } from "../../data/todoApi";
import { parseCookies } from "nookies";
import Configgroup from "../extra_modules/Configgroup";
import { useState, useEffect } from "react";
import { errorhandlingappointments } from "../../helpers/errorhandling";
import { ToastContainer } from "react-toastify";
import { errorToast } from "../../helpers/toast";

const AppHeaderAppointments = () => {
  //Get cookie
  const { jwt_token_TDL: token } = parseCookies();

  //Get user from localstorage
  const userId = localStorage.getItem("userId");

  //Set usestates
  const [appointmentTitle, setAppointmentTitle] = useState("");
  const [startDate, setStartDate] = useState(convertToAccurateDay());
  const [startTime, setStartTime] = useState(
    new Date().toLocaleTimeString().substr(0, 5)
  );
  const [stopDate, setStopDate] = useState(startDate);
  const [stopTime, setStopTime] = useState(startTime);

  //set mutations
  const [addOneAppointment] = useAddOneAppointmentMutation();

  //convert stoptime to mininum start if needed
  useEffect(() => {
    const start = new Date(startDate + " " + startTime).getTime();
    const stop = new Date(stopDate + " " + stopTime).getTime();
    if (start > stop) {
      setStopDate(startDate);
      setStopTime(startTime);
    }
  }, [startDate, startTime]);

  //Submit the appointment to the API & error on trouble
  function handleSubmitappointmentClick(e) {
    e.preventDefault();
    const appointError = errorhandlingappointments(
      "appointment-title",
      appointmentTitle
    );

    errorToast(appointError);
    if (!appointError) {
      const start = new Date(startDate + " " + startTime).getTime();
      const stop = new Date(stopDate + " " + stopTime).getTime();

      if (start <= stop && appointmentTitle.length >= 4) {
        const statusAppointment = addOneAppointment({
          id: userId,
          title: appointmentTitle,
          startsAt: startDate + " " + startTime,
          stopsAt: stopDate + " " + stopTime,
          token,
        });
        statusAppointment.then((resolve) => {
          if ("error" in resolve) {
            errorToast("Could not add appointment.");
          }
        });
      }
      setAppointmentTitle("");
    }
  }

  return (
    <>
      <header className="header">
        <ToastContainer />
        <div className="header__panel">
          <h1 className="header__panel__title">My To Do List</h1>
          <div className="header__panel__configgroup configgroup">
            <Configgroup />
          </div>
        </div>
        <form
          className="header__todoform header__todoform-appointments"
          onSubmit={handleSubmitappointmentClick}
        >
          <label className="header__todoform__label header__todoform-appointments__label">
            <span className="header__todoform__label__text header__todoform-appointments__label__text">
              Add an appointment
            </span>
            <input
              className="header__todoform__label__todoinput header__todoform-appointments__label__todoinput form-control form-control-lg"
              type="text"
              id="input-appointment"
              autoComplete="off"
              spellCheck="false"
              value={appointmentTitle}
              onInput={(e) => setAppointmentTitle(e.target.value)}
            />
          </label>
          <label className="header__todoform__label header__todoform-appointments__label">
            <span className="header__todoform__label__text header__todoform-appointments__label__text">
              Start appointment
            </span>
            <input
              className="header__todoform__label__todoinput header__todoform-appointments__label__todoinput"
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              required
            />
            <input
              className="header__todoform__label__todoinput header__todoform-appointments__label__todoinput"
              type="time"
              onChange={(e) => setStartTime(e.target.value)}
              value={startTime}
              min="00:00"
              max="23:59"
              required
            />
          </label>
          <label className="header__todoform__label header__todoform-appointments__label">
            <span className="header__todoform__label__text header__todoform-appointments__label__text">
              End appointment
            </span>
            <input
              className="header__todoform__label__todoinput header__todoform-appointments__label__todoinput"
              type="date"
              onChange={(e) => setStopDate(e.target.value)}
              value={stopDate}
              required
            />
            <input
              className="header__todoform__label__todoinput header__todoform-appointments__label__todoinput"
              type="time"
              onChange={(e) => setStopTime(e.target.value)}
              value={stopTime}
              min="00:00"
              max="23:59"
              required
            />
          </label>

          <button type="submit" className="header__todoform__addtodo">
            <span className="header__todoform__addtodo__text">
              Add todo submit button
            </span>
          </button>
        </form>
      </header>
    </>
  );
};

export default AppHeaderAppointments;
