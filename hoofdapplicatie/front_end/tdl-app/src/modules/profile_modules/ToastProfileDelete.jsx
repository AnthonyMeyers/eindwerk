import { parseCookies } from "nookies";
import { useRemoveUserCompletelyMutation } from "../../data/todoApi";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { destroyJWTCookie } from "../../helpers/jwttokens";
import {
  cleanCategories,
  cleanPriorities,
  cleanUserdata,
} from "../../data/general";

const ToastProfileDelete = ({ userId, title, useShowDelete }) => {
  //Get navigation, dispatch & token
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { jwt_token_TDL: token } = parseCookies();

  //Mutations
  const [removeUser] = useRemoveUserCompletelyMutation();

  //Remove user, clear data en redirect to login
  function handleRemoveuseraccountClick(e) {
    e.preventDefault();
    removeUser({ userId, token });
    dispatch(cleanCategories());
    dispatch(cleanPriorities());
    dispatch(cleanUserdata());
    destroyJWTCookie();
    localStorage.clear();
    return nav("/login");
  }

  //Modal from bootstrap, adapted to situation
  return (
    <div
      className="messagetoast toast show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="messagetoast__header toast-header">
        <h3 className="messagetoast__header__title">
          Message profile: <span>{title}</span>
        </h3>
        <button
          type="button"
          className="ml-2 mb-1 close messagetoast__header__button btn btn-success"
          data-dismiss="toast"
          aria-label="Close"
          onClick={() => useShowDelete(false)}
        >
          Exit
        </button>
      </div>
      <div className="toast-body"> Are you sure you would like to leave?</div>
      <button
        className="messagetoast__delete btn btn-danger"
        onClick={handleRemoveuseraccountClick}
      >
        Yes please
      </button>
    </div>
  );
};

export default ToastProfileDelete;
