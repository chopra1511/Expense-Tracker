import { useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Fragment } from "react/cjs/react.production.min";
import Navigation from "../Layout/Navigation";

const ResetCode = (props) => {

    const codeRef = useRef();
    const history = useHistory();
    const codeHandler = (event) => {
        event.preventDefault();

        const code = codeRef.current.value;
        console.log(code);

        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyBPFxrja-wN2YJAfTaqzNoEpHhXcpn5hLw",
          {
            method: "POST",
            body: JSON.stringify({
              oobCode: code,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            if (res.ok) {
                history.replace("/newpass");
              return res.json();
            } else {
              return res.json().then((data) => {
                let errorMessage = data.error.message;
                throw new Error(errorMessage);
              });
            }
          })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            alert(err.message);
          });
    }

    return (
      <Fragment>
        <Navigation />
        <div className="card">
          <form onSubmit={codeHandler}>
            <h1 className="h3 mb-3 fw-normal">Reset Code</h1>
            <div className="form-floating">
              <input
                ref={codeRef}
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="abcABC"
                required
              />
              <label htmlFor="floatingInput">Please Enter Reset Code</label>
            </div>
            <button className="btn btn-outline-success">Submit</button>
          </form>
        </div>
      </Fragment>
    );
};

export default ResetCode;