import { useRemoveOneAppointmentMutation } from "../../data/todoApi";

const ToastDeleteApm = ({id, title}) => {
  //Remove appointment mutation
  const [removeOneAppointment] = useRemoveOneAppointmentMutation();

  //Remove appointment on click
  function handledeleteAppointmentClick(){
      removeOneAppointment(id);
  }

  return (
    <div className="messagetoast toast show" role="alert" aria-live="assertive" aria-atomic="true" id={`deletetoast-${id}`}>
      <div className="messagetoast__header toast-header">
        <h3 className="messagetoast__header__title">Message appointment: {title}</h3>
        <button className="ml-2 mb-1 close messagetoast__header__button btn btn-success"
        type="button" data-dismiss="toast" aria-label="Close">Exit</button>
        </div>
      <div class="toast-body">Are you sure you would like to delete this appointment?</div>
      <button className="messagetoast__delete btn btn-danger" onClick={handledeleteAppointmentClick}>Yes please</button>
    </div>
  )
}

export default ToastDeleteApm