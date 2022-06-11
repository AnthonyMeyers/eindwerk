import { useRemoveOneAppointmentMutation } from "../../data/todoApi";



const ToastDeleteApm = ({id, title}) => {
const [removeOneAppointment] = useRemoveOneAppointmentMutation();

function handledeleteAppointmentClick(){
    removeOneAppointment(id);
}

  return (
<div class="messagetoast toast show" role="alert" aria-live="assertive" aria-atomic="true" id={`deletetoast-${id}`}>
  <div class="messagetoast__header toast-header">
    <h3>Message appointment: {title}</h3>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
    </button>
  </div>
  <div class="toast-body">
    Are you sure you would like to delete this appointment?
  </div>
  <button onClick={handledeleteAppointmentClick}>Yes please</button>
</div>
  )
}

export default ToastDeleteApm