import { useContext, useRef} from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Fragment } from "react/cjs/react.production.min";
import ThemeContext from "../../store/theme-context";
import Navigation from "../Layout/Navigation";

const ForgotPassword = () => {
    
    const enteredEmail = useRef();
    const history = useHistory();

    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;

    const sendReqhandler = (event) => {
        event.preventDefault();
        const mail = enteredEmail.current.value;
        console.log(mail);
        
            fetch(
              "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBPFxrja-wN2YJAfTaqzNoEpHhXcpn5hLw",
              {
                method: "POST",
                body: JSON.stringify({
                  requestType: "PASSWORD_RESET",
                  email: mail,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
              .then((res) => {
                  history.replace("/reset")
                  return res.json()
                })
              .then((data) => {
                console.log(data);
              });
        
        

    }


  return (
    <Fragment className={`${darkMode ? "dark" : " "}`}>
      <Navigation />
      <div className={`card ${darkMode ? "dark" : " "}`}>
        <form onSubmit={sendReqhandler}>
          <h1 className="h3 mb-3 fw-normal">Forgot Password</h1>
          <div>
            <label
              className={`${darkMode ? "dark" : " "}`}
              htmlFor="floatingInput"
            >
              Please Enter Your E-Mail
            </label>
            <input
              ref={enteredEmail}
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
            />
          </div>
          <button className="btn btn-dark">Send Link</button>
          <NavLink to="/">
            <button className="btn btn-dark">Already a user? Login</button>
          </NavLink>
        </form>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
