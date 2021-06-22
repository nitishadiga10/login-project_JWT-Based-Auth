import "./App.css";
import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoadingSpinner from "./LoadSpinner/LoadingSpinner";
// import HomePage from "./Pages/HomePage";
// import AuthPage from "./Pages/AuthPage";
// import ProfilePage from "./Pages/ProfilePage";
import Layout from "./Layout/Layout";
import { useContext } from "react";
import AuthContext from "./Store/auth-context";

const HomePage = React.lazy(() => import("./Pages/HomePage"));
const AuthPage = React.lazy(() => import("./Pages/AuthPage"));
const ProfilePage = React.lazy(() => import("./Pages/ProfilePage"));

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  return (
    <Layout>
      <Suspense
        fallback={
          <div style={{ display: "flex", justifyContent: "center" }}>
            <LoadingSpinner></LoadingSpinner>
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            {!authCtx.isLoggedIn && <Redirect to="/auth"></Redirect>}
            {authCtx.isLoggedIn && <HomePage></HomePage>}
          </Route>
          <Route path="/auth">
            {authCtx.isLoggedIn && <Redirect to="/"></Redirect>}
            {!authCtx.isLoggedIn && <AuthPage></AuthPage>}
          </Route>
          <Route path="/profile">
            {!authCtx.isLoggedIn && <Redirect to="/auth"></Redirect>}
            {authCtx.isLoggedIn && <ProfilePage></ProfilePage>}
          </Route>
          <Route path="*">
            <Redirect to="/"></Redirect>
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
