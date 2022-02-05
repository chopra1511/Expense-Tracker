import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
    return (
      <Fragment>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <i>
              <h3 className="h3">Welcome To Expense Tracker!!!</h3>
            </i>
            <form className="d-flex">
              <h3 className="h3">
                <i>
                  Your Profile Is Incomplete.
                  <NavLink to="/contact">Complete Now</NavLink>
                </i>
              </h3>
            </form>
          </div>
        </nav>
      </Fragment>
    );
};

export default Welcome;