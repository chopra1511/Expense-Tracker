import { useContext, useRef } from "react";
import { Fragment } from "react/cjs/react.production.min";
import ThemeContext from "../../store/theme-context";
import Navigation from "../Layout/Navigation";

const NewPassword = (props) => {

  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const passRef = useRef();
    const codeRef = useRef();
  const changePassHandler = (event) => {
    event.preventDefault();

    const pass = passRef.current.value;
    const code = codeRef.current.value;
    console.log(pass);
    console.log(code);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyBPFxrja-wN2YJAfTaqzNoEpHhXcpn5hLw",
      {
        method: "POST",
        body: JSON.stringify({
            oobCode: code,
            newPassword: pass,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <Fragment className={`${darkMode ? "dark" : " "}`}>
      <Navigation />
      <div className={`card ${darkMode ? "dark" : " "}`}>
        <form onSubmit={changePassHandler}>
          <h1 className="h3 mb-3 fw-normal">Reset Password</h1>
          <div>
            <label
              className={`${darkMode ? "dark" : " "}`}
              htmlFor="floatingPassword"
            >
              ReEnter The Reset Code
            </label>
            <input
              ref={codeRef}
              type="text"
              className="form-control"
              placeholder="text"
              required
            />
          </div>
          <div>
            <label
              className={`${darkMode ? "dark" : " "}`}
              htmlFor="floatingPassword"
            >
              New Password
            </label>
            <input
              ref={passRef}
              type="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <label
              className={`${darkMode ? "dark" : " "}`}
              htmlFor="floatingPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <button className="btn btn-success" type="submit">
            Change Password
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default NewPassword;
