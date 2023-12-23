import React from "react";
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";

function Layout(props) {

    const {} = props
  return (
    <div>
      <div className="">{props.children}</div>
    </div>
  );
}

export default Layout;
