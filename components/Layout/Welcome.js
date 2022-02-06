
import { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AuthContext from '../../store/auth-context';
import './Welcome.css';

const Welcome = (props) => {
  
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const logoutHandler = () => {
      authCtx.logout();
      history.replace("/");
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
        alert("Your Full Name: " + data.users[0].displayName + "\n" + "Your Profile URL: " + data.users[0].photoUrl);
        
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
        <div className='card'>
          
        </div>
      </Fragment>
    );
};

export default Welcome;