import { Fragment, useContext } from "react";
import ThemeContext from "../../store/theme-context";


const Navigation = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const onClick = () => {
    if (darkMode) theme.dispatch({ type: "LIGHTMODE" });
    else theme.dispatch({ type: "DARKMODE" });
  };


    return (
      <Fragment className={`${darkMode ? "dark" : " "}`}>
        <nav
          className={`navbar navbar-expand-lg navbar-light bg-light${
            darkMode ? "dark" : " "
          }`}
        >
          <div className="container-fluid">
            <a className="navbar-brand" href=" ">
              MyWebLink
            </a>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-link" href=" ">
                  HOME
                </a>
                <a className="nav-link" href=" ">
                  PRODUCT
                </a>
                <a className="nav-link" href=" ">
                  ABOUT US
                </a>
                <button
                  className={`btn ${darkMode ? "btn-dark" : "btn-light"}`}
                  onClick={onClick}
                >
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </Fragment>
    );
};

export default Navigation;