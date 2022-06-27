import { parseCookies } from "nookies";
import { useChangeUsernameMutation } from "../../data/todoApi";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { destroyJWTCookie } from "../../helpers/jwttokens";
import {
  cleanCategories,
  cleanPriorities,
  cleanUserdata,
} from "../../data/general";
import { errorhandlingreg } from "../../helpers/errorhandling";

const ToastProfileUsername = ({ userId, title, useShowUsername }) => {
  //get navigate, dispatch & token
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { jwt_token_TDL: token } = parseCookies();

  //set usestates
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  //Mutations
  const [changeUsername] = useChangeUsernameMutation();

  //Remove user, clear data en redirect to login
  async function handleChangeusernameClick(e) {
    e.preventDefault();
    setError(null);
    const nativeError = errorhandlingreg("register-username", username);
    if (!nativeError) {
      const result = changeUsername({
        id: userId,
        name: username,
        token,
      });
      result.then((resolve) => {
        if ("error" in resolve) {
          if ("data" in resolve.error) {
            setError("User already exists.");
          }
        } else {
          dispatch(cleanCategories());
          dispatch(cleanPriorities());
          dispatch(cleanUserdata());
          destroyJWTCookie();
          localStorage.clear();
          return nav("/login");
        }
      });
    } else setError(nativeError);
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
          onClick={() => useShowUsername(false)}
        >
          Exit
        </button>
      </div>
      <form onSubmit={handleChangeusernameClick}>
        <div className="toast-body">
          {" "}
          Change your username? You will be logged out.
          <label className="toast-body__label">
            New username:
            <input
              className="toast-body__label__input"
              maxLength="20"
              type="text"
              onInput={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="messagetoast__delete btn btn-danger">
          Yes please
        </button>
      </form>
    </div>
  );
};

export default ToastProfileUsername;
