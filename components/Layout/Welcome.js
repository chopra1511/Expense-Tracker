import { Fragment, useContext, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../../store/auth-context";
import Expense from "./Expense";
import "./Welcome.css";

const Welcome = (props) => {
  const [expense, setExpense] = useState([]);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const enteredAmount = useRef();
  const enteredDescription = useRef();
  const enteredSelect = useRef();

  

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/");
  };
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
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const name = data.users[0].displayName;
      document.getElementById("name").innerText = name;
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
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  
  fetch("https://expense-36826-default-rtdb.firebaseio.com/expenseData.json")
    .then((res) => res.json())
    .then((data) => {
      const eData = [];
      for (const key in data) {
        eData.push({
          id: key,
          amount: data[key].amount,
          des: data[key].des,
          category: data[key].category,
        });
        console.log(data[key].amount, data[key].des, data[key].category);
      }
      setExpense(eData);
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
            <button className="btn btn-outline-danger" onClick={logoutHandler}>
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
              id="amt"
              className="form-control"
              placeholder="number"
              required
            />
            <label htmlFor="floatingPassword">Amount</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              id="des"
              className="form-control"
              placeholder="text"
              required
              ref={enteredDescription}
            />
            <label htmlFor="floatingPassword">Description</label>
          </div>
          <label htmlFor="floatingPassword">Category</label>
          <div className="form-floating">
            <select className="form-control" id="cat" ref={enteredSelect}>
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
      <Expense exp={expense}/>
    </Fragment>
  );
};

export default Welcome;
