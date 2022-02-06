
import { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import './Welcome.css';

const Welcome = (props) => {
    const authCtx = useContext(AuthContext);

    const logoutHandler = () => {
      authCtx.logout();
    }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBPFxrja-wN2YJAfTaqzNoEpHhXcpn5hLw",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res =>{
        return res.json();
      }).then(data => {
        console.log("Your Full Name: ", data.users[0].displayName);
        console.log("Your Profile URL: ", data.users[0].photoUrl);
      })


    return (
      <Fragment>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <i>
              <h3 className="h3">Welcome To Expense Tracker!!!</h3>
            </i>
            <div className="d-flex">
              <h3 className="h3">
                <i>
                  Your Profile Is Incomplete.
                  <NavLink to="/contact">Complete Now</NavLink>
                </i>
              </h3>
            </div>
            <div>
              <button
                className="btn btn-outline-danger"
                onClick={logoutHandler}
              >
                LogOut
              </button>
            </div>
          </div>
        </nav>
        <div className="card">
          <h2>Full Name: </h2>
          <h2>Profile URL: </h2>
        </div>
      </Fragment>
    );
};

export default Welcome;