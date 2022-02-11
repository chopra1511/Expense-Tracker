import { Fragment, useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import ThemeContext from "../../store/theme-context";
import Navigation from "../Layout/Navigation";
import "./AuthForm.css";

const AuthForm = (props) => {
const theme = useContext(ThemeContext);
const darkMode = theme.darkMode;
  const authCtx = useContext(AuthContext);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const history = useHistory();

    const [isLogin, setIsLogin] = useState(true);

    const passwordHandler = () => {
      history.replace("/forgotPassword");
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
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPFxrja-wN2YJAfTaqzNoEpHhXcpn5hLw"
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
          history.replace("/welcome");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  
  return (
    <Fragment className={`${darkMode ? "dark" : " "}`}>
      <Navigation />
      <div className={` card ${darkMode ? "dark" : " "}`}>
        <form onSubmit={submitHandler}>
          <h1 className="h3 mb-3 fw-normal">{isLogin ? "Login" : "Sign Up"}</h1>
          <div>
            <label
              className={`${darkMode ? "dark" : " "}`}
              htmlFor="floatingInput"
            >
              Email address
            </label>
            <input
              ref={emailInputRef}
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label
              className={`${darkMode ? "dark" : " "}`}
              htmlFor="floatingPassword"
            >
              Password
            </label>
            <input
              ref={passwordInputRef}
              type="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          {!isLogin && (
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
          )}
          {isLogin && (
            <button className="btn btn-light" onClick={passwordHandler}>
              Forgot Password?
            </button>
          )}
          <br />
          <button className="btn btn-lg btn-primary" type="submit">
            {isLogin ? "Login" : "Create Account"}
          </button>
          <br />
          <button
            className="btn btn-dark"
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
