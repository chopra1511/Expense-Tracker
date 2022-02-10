import { Fragment, useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../../store/auth-context";
import ThemeContext from "../../store/theme-context";
import "./Contact.css";


const Contact = (props) => {
const theme = useContext(ThemeContext);
const darkMode = theme.state.darkMode;
    const authCtx = useContext(AuthContext);
   const history = useHistory();
    const nameEntered = useRef();
    const urlEntered = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const name = nameEntered.current.value;
        const url = urlEntered.current.value;
        console.log(name, url);

        
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBPFxrja-wN2YJAfTaqzNoEpHhXcpn5hLw",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: authCtx.token,
              displayName: name,
              photoUrl: url,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            console.log(res.json());
            history.replace("/welcome");

          })
          .catch((error) => {
            alert(error.message);
          });
    };




  return (
    <Fragment className={`${darkMode ? "dark" : " "}`}>
      <nav className={`navbar ${darkMode ? "dark" : " "}`}>
        <div className="container-fluid">
          <h3 className="h3">
            <i>Winners Never Quit, Quitters Never Win.</i>
          </h3>
          <form className="d-flex">
            <h3 className="h3">
              <i>
                Your Profile is <b>64%</b> completed. A complete profile has
                <br />
                higher chances of landing a job.<a href=" ">Complete Now</a>
              </i>
            </h3>
          </form>
        </div>
      </nav>
      <div className="container contact">
        <form onSubmit={submitHandler}>
          <div className="row">
            <div className="col">
              <h2>Contact Details</h2>
            </div>
            <div className="col cancel">
              <NavLink to="/welcome">
                <button className="btn btn-outline-danger">Cancel</button>
              </NavLink>
            </div>
          </div>
          <label htmlFor="Name">Full Name:</label>
          <input
            className="form-control"
            type="text"
            required
            ref={nameEntered}
          />
          <label htmlFor="Name">Profile Photo URL:</label>
          <input
            className="form-control"
            type="url"
            required
            ref={urlEntered}
          />
          <button className="btn btn-success" type="submit">
            Update
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Contact;
