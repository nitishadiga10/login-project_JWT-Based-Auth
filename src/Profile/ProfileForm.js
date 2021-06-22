import { useRef, useContext } from "react";
import AuthContext from "../Store/auth-context";

import classes from "./ProfileForm.module.css";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewpassword = newPasswordInputRef.current.value;

    let url;
    let API_KEY = "AIzaSyDIHClO8f_HxJFTY5J0BAYVKyu0GOIVKqA";

    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" +
      API_KEY;
    fetch(url, {
      method: "post",
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewpassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // setIsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMessage = "Authentication Failed!";

            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            console.log(data);
            throw new Error(errorMessage);
          });
        }
      })
      .then((res) => {
        console.log(res);
        alert("Successfully changed password");
        const expirationTime = new Date(
          new Date().getTime() + +res.expiresIn * 1000
        );

        authCtx.login(res.idToken, expirationTime.toISOString());
        history.replace("/");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
