import { useState, useEffect } from "react";
import { convertToAccurateDay } from "../../helpers/datehelpers";
import { useUpdateAppointmentMutation } from "../../data/todoApi";
import ToastDeleteApm from "./ToastDeleteApm";
import AppointmentContact from "./AppointmentContact";
import { parseCookies } from "nookies";
import { errorhandlingappointments } from "../../helpers/errorhandling";
import ErrorMessage from "../extra_modules/Errormessage";

const Appointment = ({ appointment, contacts, activeItem }) => {
  const { jwt_token_TDL: token } = parseCookies();

  //Make appointment variables available cleanly
  const {
    id,
    apmTitle,
    apmDescription,
    apmStartsat,
    apmStopsat,
    apmUsr,
    apmCnt,
  } = appointment;

  //Usestates directly for forms
  const [title, setTitle] = useState(apmTitle);
  const [description, setDescription] = useState(apmDescription);
  const [dateStarts, setDateStarts] = useState(
    convertToAccurateDay(apmStartsat)
  );
  const [timeStarts, setTimeStarts] = useState(
    new Date(apmStartsat).toLocaleTimeString().substr(0, 5)
  );
  const [dateStops, setDateStops] = useState(convertToAccurateDay(apmStopsat));
  const [timeStops, setTimeStops] = useState(
    new Date(apmStopsat).toLocaleTimeString().substr(0, 5)
  );
  const [contactPerson, setContactPerson] = useState(apmCnt?.id || 0);
  const [errorTitle, setErrorTitle] = useState(null);

  //Functional usestates
  const [disabled, setDisabled] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [formId, setFormId] = useState(`${id}`);

  //Mutations & queries
  const [updateAppointment] = useUpdateAppointmentMutation();

  //Checks what form is clicked & enables / disables the forms
  useEffect(() => {
    if (
      activeItem.id === `appointment-${formId}` ||
      activeItem?.parentElement?.id === `appointment-${formId}` ||
      activeItem?.id === `deletetoast-${id}` ||
      activeItem?.parentElement?.id === `deletetoast-${id}` ||
      activeItem.id === `appointmentlabel-${formId}` ||
      activeItem?.parentElement?.id === `appointmentlabel-${formId}` ||
      activeItem.id === `appointmentbuttongroup-${formId}` ||
      activeItem?.parentElement?.id === `appointmentbuttongroup-${formId}`
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
      setShowDelete(false);
      setShowContact(false);
    }
  }, [activeItem]);

  //Updates time is starttime exceeds endtime
  useEffect(() => {
    const start = new Date(dateStarts + " " + timeStarts).getTime();
    const stop = new Date(dateStops + " " + timeStops).getTime();
    if (start > stop) {
      setDateStops(dateStarts);
      setTimeStops(timeStarts);
    }
  }, [dateStarts, timeStarts, dateStops, timeStops]);

  //Update appointment
  function handleUpdateappointmentSubmit(e) {
    e.preventDefault();
    const appointError = errorhandlingappointments("appointment-title", title);
    setErrorTitle(appointError);
    if (!appointError) {
      const start = new Date(dateStarts + " " + timeStarts).getTime();
      const stop = new Date(dateStops + " " + timeStops).getTime();
      if (start <= stop && title.length >= 4) {
        updateAppointment({
          appId: id,
          appTitle: title,
          appStartsAt: dateStarts + " " + timeStarts,
          appStopsAt: dateStops + " " + timeStops,
          userId: apmUsr.id,
          appDescription: description,
          contactId: contactPerson > 0 ? contactPerson : null,
          token,
        });
      }
    }
  }
  return (
    <>
      <ErrorMessage className={"error-center"}>{errorTitle}</ErrorMessage>
      <div className="appointment">
        <form
          className="appointment__front"
          id={`appointment-${formId}`}
          onSubmit={handleUpdateappointmentSubmit}
        >
          <div className="appointment__front__sort">
            <label
              className="appointment__front__label"
              id={`appointmentlabel-${id}`}
            >
              <span className="appointment__front__label__text">Title:</span>
              <input
                type="text"
                className="appointment__front__input form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={disabled}
              />
            </label>

            {contacts && contacts.length > 0 && (
              <label
                htmlFor={`select-${id}`}
                className="appointment__front__label"
                id={`appointmentlabel-${id}`}
              >
                <span className="appointment__front__label__text">
                  Contact:{" "}
                </span>
                <select
                  id={`select-${id}`}
                  disabled={disabled}
                  className="appointment__front__select custom-select"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                >
                  <option value="0"></option>
                  {contacts.map((contact) => (
                    <option key={contact.id} value={contact.id}>
                      {contact.cntName}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
          <div className="appointment__front__sort">
            <label
              htmlFor={`startdate-${id}`}
              className="appointment__front__label"
              id={`appointmentlabel-${id}`}
            >
              <span className="appointment__front__label__text">
                Start date
              </span>
              <input
                id={`startdate-${id}`}
                type="date"
                className="appointment__front__input appointment__front__input-time form-control "
                value={dateStarts}
                onChange={(e) => setDateStarts(e.target.value)}
                disabled={disabled}
              />
            </label>
            <label
              htmlFor={`starttime-${id}`}
              className="appointment__front__label"
              id={`appointmentlabel-${id}`}
            >
              <span className="appointment__front__label__text">
                Start time
              </span>
              <input
                id={`starttime-${id}`}
                type="time"
                className="appointment__front__input appointment__front__input-time form-control "
                value={timeStarts}
                onChange={(e) => setTimeStarts(e.target.value)}
                disabled={disabled}
              />
            </label>
          </div>
          <div className="appointment__front__sort">
            <label
              htmlFor={`enddate-${id}`}
              className="appointment__front__label"
              id={`appointmentlabel-${id}`}
            >
              <span className="appointment__front__label__text">End date</span>
              <input
                id={`enddate-${id}`}
                type="date"
                className="appointment__front__input appointment__front__input-time form-control "
                value={dateStops}
                onChange={(e) => setDateStops(e.target.value)}
                disabled={disabled}
              />
            </label>

            <label
              htmlFor={`endtime-${id}`}
              className="appointment__front__label"
              id={`appointmentlabel-${id}`}
            >
              <span className="appointment__front__label__text">End time</span>
              <input
                id={`endtime-${id}`}
                type="time"
                className="appointment__front__input appointment__front__input-time form-control "
                value={timeStops}
                onChange={(e) => setTimeStops(e.target.value)}
                disabled={disabled}
              />
            </label>
          </div>
          <div
            className="appointment__front__buttongroup"
            id={`appointmentbuttongroup-${id}`}
          >
            <button
              type="submit"
              className="appointment__front__buttongroup__button btn btn-primary"
            >
              Save appointment
            </button>
            <button
              className="appointment__front__buttongroup__button btn btn-primary"
              onClick={() => setShowDelete(!showDelete)}
            >
              {" "}
              Delete appointment
            </button>
            <button
              className="appointment__front__buttongroup__button btn btn-primary"
              onClick={() => setShowContact(!showContact)}
            >
              show contact details
            </button>
          </div>
        </form>

        {showDelete && !disabled && <ToastDeleteApm id={id} title={apmTitle} />}
        {showContact && !disabled && (
          <AppointmentContact
            contactInfo={contactPerson}
            startApm={{ startDate: dateStarts, startTime: timeStarts }}
          />
        )}
      </div>
    </>
  );
};

export default Appointment;
