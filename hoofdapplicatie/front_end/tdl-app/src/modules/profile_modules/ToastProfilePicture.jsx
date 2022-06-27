import { parseCookies } from "nookies";
import { useChangeUserPictureMutation } from "../../data/todoApi";
import { useEffect, useState } from "react";

const ToastProfilePicture = ({
  userId,
  title,
  useShowPicture,
  usePictureStatus,
}) => {
  const { jwt_token_TDL: token } = parseCookies();
  const [changePicture] = useChangeUserPictureMutation();
  const [pictureUrl, setPictureUrl] = useState("");

  async function handleChangePicturesubmit(e) {
    e.preventDefault();
    const statusPic = changePicture({
      id: userId,
      picture: pictureUrl,
      token,
    });
    const data = await statusPic;

    if ("error" in data) {
      usePictureStatus(false);
    } else {
      usePictureStatus(true);
    }
    useShowPicture(false);
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
          onClick={() => useShowPicture(false)}
        >
          Exit
        </button>
      </div>
      <form onSubmit={handleChangePicturesubmit}>
        <div className="toast-body">
          {" "}
          Change your profile picture?
          <label className="toast-body__label">
            New picture:
            <input
              className="toast-body__label__input"
              type="text"
              onInput={(e) => setPictureUrl(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" className="messagetoast__delete btn btn-danger">
          Yes please
        </button>
      </form>
    </div>
  );
};

export default ToastProfilePicture;
