import { Fragment, useRef, useState } from "react";
import Navigation from "../Layout/Navigation";
import "./AuthForm.css";

const AuthForm = (props) => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const [isLogin, setIsLogin] = useState(true);
    const [isVerified , setIsVerified] = useState(true);

    const verificationHandler = () => {
      if (!isVerified) {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBPFxrja-wN2YJAfTaqzNoEpHhXcpn5hLw",
          {
            method: "POST",
            body: JSON.stringify({
              requestType: "VERIFY_EMAIL",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((data) => {
            setIsVerified(false);
            console.log(data);
          })
          .catch((err) => {
            alert(err.message);
          });
      }

      }
     
    const switchAuthModeHandler = () => {
      setIsLogin((prevState) => !prevState);
    };

    const submitHandler = event => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
      let url;
    if (isLogin) {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPFxrja-wN2YJAfTaqzNoEpHhXcpn5hLw";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPFxrja-wN2YJAfTaqzNoEpHhXcpn5hLw";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("User Logged in");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  
  return (
    <Fragment>
      <Navigation />
      <div className="card">
        <form onSubmit={submitHandler}>
          <h1 className="h3 mb-3 fw-normal">{isLogin ? "Login" : "Sign Up"}</h1>
          <div className="form-floating">
            <input
              ref={emailInputRef}
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
            />
            <label htmlfor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              ref={passwordInputRef}
              type="password"
              className="form-control"
              placeholder="Password"
              required
            />
            <label htmlfor="floatingPassword">Password</label>
          </div>
          {!isLogin && <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
            />
            <label htmlfor="floatingPassword">Confirm Password</label>
          </div>}
          {isVerified && <button className="btn btn-dark" type="submit" onClick={verificationHandler}>Verify E-mail</button>}
          <button className="btn btn-lg btn-primary" type="submit">
            {isLogin ? "Login" : "Create Account"}
          </button>
          <button
            className="btn btn-outline-dark"
            type="submit"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default AuthForm;
