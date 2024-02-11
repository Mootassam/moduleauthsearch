import React from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import authActions from "@modules/auth/authActions";
import { i18n } from "../../i18n";

function Header() {
  const dispatch = useDispatch();
  const doSignout = () => {
    dispatch(authActions.doSignoutWithtime());
  };
  return (
    <div className="app__header">
      <div className="style__header">
        <div></div>
        <div>
          <span className="logout" onClick={doSignout}>
            {" "}
            {i18n("common.logout")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
