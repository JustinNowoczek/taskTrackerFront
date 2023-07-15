import Cookies from "js-cookie";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const ActionFail = () => {
  const location = useLocation();
  const userID = Cookies.get("userID");
  const { code, data } = location.state;
  let linkText = userID ? "To Dashboard" : "Log In";
  let linkLink = userID ? "/dashboard/" + userID : "/login";
  switch (code) {
    case "invalidLogin":
      linkText = "Try Again";
      linkLink = "/login";
      break;
    case "existingUser":
      linkText = "Try Again";
      linkLink = "/register";
      break;
  }
  return (
    <>
      <dialog open className="modal-box mt-52 w-10/12 max-w-5xl bg-error bg-opacity-30 text-base-200">
        <p className="text-2xl font-bold">Oh No! It Seems An Error Occurred: ({code ? code : "serverError"})</p>
        <br />
        <p className="text-lg">{data}</p>
        <div className="modal-action">
          <Link className="btn bg-base-200 text-xl normal-case text-opacity-50" to={linkLink} reloadDocument>
            {linkText}
          </Link>
        </div>
      </dialog>
    </>
  );
};

export default ActionFail;
