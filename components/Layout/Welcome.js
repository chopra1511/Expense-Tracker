
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
        
        

        console.log(amount, description, select);

        fetch(
          "https://expense-36826-default-rtdb.firebaseio.com/expenseData.json",
          {
            method: "POST",
            body: JSON.stringify({
              amount: amount,
              des: description,
              category: select,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => res.json()).then((data) => {
            console.log(data);
          })

      }
      
      fetch(
        "https://expense-36826-default-rtdb.firebaseio.com/expenseData.json"
      )
        .then((res) => res.json())
        .then((data) => {
          for(const key in data){
            document.getElementById("a").innerText = data[key].amount;
            document.getElementById("d").innerText = data[key].des;
            document.getElementById("c").innerText = data[key].category;
            console.log(data[key].amount, data[key].des, data[key].category);
          }
          console.log(data); 
        });
     


    return (
      <Fragment>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <i>
              <h3 className="h3">Welcome To Expense Tracker!!!</h3>
            </i>
            <div className="d-flex">
              <h3 className="h3">USER:</h3>
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
            <div className="col">Amount</div>
            <div className="col">Description</div>
            <div className="col">Category</div>
          </div>
          <div className="row">
            <div className="col" id="a"></div>
            <div className="col" id="d"></div>
            <div className="col" id="c"></div>
          </div>
        </div>
      </Fragment>
    );
};

export default Welcome;