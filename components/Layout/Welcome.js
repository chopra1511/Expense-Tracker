import { Fragment, useContext, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../../store/auth-context";
import ThemeContext from "../../store/theme-context";
import Expense from "./Expense";
import "./Welcome.css";

const Welcome = (props) => {
const theme = useContext(ThemeContext);
const darkMode = theme.state.darkMode;

  const [expense, setExpense] = useState([]);
  const [total, setTotal] = useState(false);
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
      let tA = 0;
      for (const key in data) {    
        tA = +tA + +data[key].amount;
        eData.push({
          id: key,
          amount: data[key].amount,
          des: data[key].des,
          category: data[key].category,
        });
        console.log(data[key].amount, data[key].des, data[key].category);
      }
      if(tA > 10000){
        console.log("premium");
        setTotal(true);
      }else{
        setTotal(false);
      }
      document.getElementById('total').innerText = tA;
      setExpense(eData);
      console.log(data);
    });

  return (
    <Fragment className={`${darkMode ? "dark" : " "}`}>
      <nav className={`navbar ${darkMode ? "dark" : " "}`}>
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
      <div className={`card${darkMode ? "dark" : " "}`}>
        <form onSubmit={expenseHnadler}>
          <h1 className="h3 mb-3 fw-normal">Day-To-Day Expense</h1>
          <div>
            <label
              className={`${darkMode ? "dark" : " "}`}
              htmlFor="floatingPassword"
            >
              Amount
            </label>
            <input
              ref={enteredAmount}
              type="number"
              id="amt"
              className="form-control"
              placeholder="number"
              required
            />
          </div>
          <div>
            <label
              className={`${darkMode ? "dark" : " "}`}
              htmlFor="floatingPassword"
            >
              Description
            </label>
            <input
              type="text"
              id="des"
              className="form-control"
              placeholder="text"
              required
              ref={enteredDescription}
            />
          </div>
          <label
            className={`${darkMode ? "dark" : " "}`}
            htmlFor="floatingPassword"
          >
            Category
          </label>
          <div className="form-floating">
            <select
              className={`form-control${darkMode ? "dark" : " "}`}
              id="cat"
              ref={enteredSelect}
            >
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
      <Expense exp={expense} total={total} />
    </Fragment>
  );
};

export default Welcome;
