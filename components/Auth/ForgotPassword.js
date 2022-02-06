import { useRef} from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Fragment } from "react/cjs/react.production.min";
import Navigation from "../Layout/Navigation";

const ForgotPassword = () => {
    
    const enteredEmail = useRef();
    const history = useHistory();

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
    <Fragment>
      <Navigation />
      <div className="card">
        <form onSubmit={sendReqhandler}>
          <h1 className="h3 mb-3 fw-normal">Forgot Password</h1>
          <div className="form-floating">
            <input
              ref={enteredEmail}
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
            />
            <label htmlFor="floatingInput">Please Enter Your E-Mail</label>
          </div>
          <button className="btn btn-outline-dark">Send Link</button>
          <NavLink to="/">
            <button className="btn btn-dark">Already a user? Login</button>
          </NavLink>
        </form>
        
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
