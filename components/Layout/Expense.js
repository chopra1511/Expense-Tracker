import { useContext } from "react";
import ThemeContext from "../../store/theme-context";

const Expense = props => {

   const theme = useContext(ThemeContext);
   const darkMode = theme.state.darkMode;
    const date = new Date();
    const d = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();

    //  const data = props.exp.map(data => data);
    //  function makeCsv(row) {
    //    return row.map((r) => r.join(",")).join("\n");
    //  }

    //  const blob = new Blob([makeCsv(data)]);
    //  const h = URL.createObjectURL(blob);

    const onClick = () => {
      if (darkMode) theme.dispatch({ type: "LIGHTMODE" });
      else theme.dispatch({ type: "DARKMODE" });
    };


    const deleteHandler = (val) => {
      fetch(
        `https://expense-36826-default-rtdb.firebaseio.com/expenseData/${val.target.id}.json`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
            console.log("Expense Successfully Deleted");
          console.log(data);
        });
    } 

    function updateHandler(val) {
         fetch(
           `https://expense-36826-default-rtdb.firebaseio.com/expenseData/${val.target.id}.json`,
           {
             method: "PATCH",
             body: JSON.stringify({
               amount: (document.getElementById("amt").value =
                 props.exp.amount),
               des: (document.getElementById("des").value = props.exp.des),
               category: (document.getElementById("cat").value =
                 props.exp.category),
             }),
           }
         )
           .then((res) => res.json())
           .then((data) => {
             console.log("Expense Successfully Deleted");
             console.log(data);
           });
    }
   
    return (
      <div className={`card ex ${darkMode ? "dark" : " "}`}>
        <i>
          <h1 className="h3 mb-3 fw-normal">Day-To-Day Expense</h1>
        </i>
        <div className="row h5 mb-3 fw-normal">
          <div className="col">Date: {d} </div>
        </div>
        <a href= " " download="File.csv" >Download</a>
        <div className="row">
          <div className="col">Amount</div>
          <div className="col">Description</div>
          <div className="col">Category</div>
          <div className="col">
            Total
            <h3 className="h3 mb-3 fw-normal" id="total"> </h3>
            {props.total && (
              <button className={`btn btn-info ${darkMode ? "dark" : " "}`} id="premium" onClick={onClick}>
                Premium
              </button>
            )}
          </div>
        </div>
        {props.exp.map((data) => (
          <div className="row">
            <div className="col">{data.amount}</div>
            <div className="col">{data.des}</div>
            <div className="col">{data.category}</div>
            <div className="col">
              <button
                className="btn btn-danger"
                onClick={deleteHandler}
                id={data.id}
              >
                X
              </button>
              <button
                className="btn btn-warning"
                onClick={updateHandler}
                id={data.id}
              >
                O
              </button>
            </div>
          </div>
        ))}
      </div>
    );
};

export default Expense;