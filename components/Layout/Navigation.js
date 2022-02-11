import { Fragment } from "react";

const Navigation = () => {
  

    return (
      <Fragment className={`dark`}>
        <nav
          className={`navbar navbar-expand-lg navbar-light bg-light`}
        >
          <div className="container-fluid" id="navDiv">
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
              </div>
            </div>
          </div>
        </nav>
      </Fragment>
    );
};

export default Navigation;