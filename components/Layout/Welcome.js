
import { Fragment, useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AuthContext from '../../store/auth-context';
import './Welcome.css';

const Welcome = (props) => {
  
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    
    const enteredAmount = useRef();
    const enteredDescription = useRef();
    const enteredSelect = useRef();

    const date = new Date();
    const d = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();

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
       const name = data.users[0].displayName;
       document.getElementById('name').innerText = name;
        
      });
      
      const expenseHnadler = (event) => {
        event.preventDefault();
        
        const amount = enteredAmount.current.value;
        const description = enteredDescription.current.value;
        const select = enteredSelect.current.value;
        
        document.getElementById("amount").innerText = amount;
        document.getElementById("description").innerText = description;
        document.getElementById("select").innerText = select;

        console.log(amount, description, select);
      }
      
     


    return (
      <Fragment>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <i>
              <h3 className="h3">Welcome To Expense Tracker!!!</h3>
            </i>
            <div className="d-flex">
              <h3 className="h3">
                USER:
              </h3>
              <h3 className="h3" id="name">
                {" "}
              </h3>
            </div>
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
          <form onSubmit={expenseHnadler}>
            <h1 className="h3 mb-3 fw-normal">Day-To-Day Expense</h1>
            <div className="form-floating">
              <input
                ref={enteredAmount}
                type="number"
                className="form-control"
                placeholder="number"
                required
              />
              <label htmlFor="floatingPassword">Amount</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="text"
                required
                ref={enteredDescription}
              />
              <label htmlFor="floatingPassword">Description</label>
            </div>
            <label htmlFor="floatingPassword">Category</label>
            <div className="form-floating">
              <select className="form-control" ref={enteredSelect}>
                <option value="Food">Food</option>
                <option value="Salary">Salary</option>
                <option value="Petrol">Petrol</option>
                <option value="Rent">Rent</option>
              </select>
            </div>
            <button className="btn btn-success" type="submit">
              Add Expense
            </button>
          </form>
        </div>
        <div className="card ex">
          <i>
            <h1 className="h3 mb-3 fw-normal">Day-To-Day Expense</h1>
          </i>
          <div className="row h5 mb-3 fw-normal">
            <div className="col">Date: {d} </div>
          </div>
          <div className="row">
            <div className="col">Amount:</div>
            <div className="col" id="amount"></div>
          </div>
          <div className="row">
            <div className="col">Description:</div>
            <div className="col" id="description"></div>
          </div>
          <div className="row">
            <div className="col">Category:</div>
            <div className="col" id="select"></div>
          </div>
        </div>
      </Fragment>
    );
};

export default Welcome;