import { useRef } from "react";
import { Fragment } from "react/cjs/react.production.min";
import Navigation from "../Layout/Navigation";

const NewPassword = (props) => {

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
    <Fragment>
      <Navigation />
      <div className="card">
        <form onSubmit={changePassHandler}>
          <h1 className="h3 mb-3 fw-normal">Reset Password</h1>
          <div className="form-floating">
            <input
              ref={codeRef}
              type="text"
              className="form-control"
              placeholder="text"
              required
            />
            <label htmlFor="floatingPassword">ReEnter The Reset Code</label>
          </div>
          <div className="form-floating">
            <input
              ref={passRef}
              type="password"
              className="form-control"
              placeholder="Password"
              required
            />
            <label htmlFor="floatingPassword">New Password</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
            />
            <label htmlFor="floatingPassword">Confirm Password</label>
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
