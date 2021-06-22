import MainNavigation from "./MainNavigation";
import { Fragment } from "react";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation></MainNavigation>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
