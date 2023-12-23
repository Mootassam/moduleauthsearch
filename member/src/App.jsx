import { useRef, useState, useEffect } from "react";
import "./App.css";
import RoutesComponent from "@view/routes/RoutesComponent";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import { configureStore, getHistory } from "@modules/store";
const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={getHistory()}>
        <RoutesComponent />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
