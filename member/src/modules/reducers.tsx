/* eslint-disable react-refresh/only-export-components */
import { connectRouter } from "connected-react-router";
import layout from "@modules/layout/layoutReducers";
import auth from "@modules/auth/authReducers";
import tenant from "@modules/tenant/tenantReducers";
import user from "@modules/user/userReducers";
import settings from "@modules/settings/settingsReducers";

import { combineReducers } from "redux";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    layout,
    auth,
    tenant,
    user,
    settings,
  });
