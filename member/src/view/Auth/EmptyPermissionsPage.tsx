import React from "react";
import selectors from "@modules/auth/authSelectors";
import actions from "@modules/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { i18n } from "../../i18n";

import './Styles/styles.css'


function EmptyPermissionsPage() {
  const dispatch = useDispatch();

  const doSignout = () => {
    dispatch(actions.doSignout());
  };
  return (
    <div className="app__empty">
      <div className="no__permission">
      {i18n('auth.emptyPermissions.message')}

      </div>

      <button type="button" onClick={doSignout} className="signout">
        {i18n('auth.signout')}
      </button>
    </div>
  );
}

export default EmptyPermissionsPage;
