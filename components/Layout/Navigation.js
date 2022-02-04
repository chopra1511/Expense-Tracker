import { Fragment } from "react/cjs/react.production.min";

const Navigation = () => {
    return (
      <Fragment>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href=" ">
              MyWebLink
            </a>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-link" href=" ">
                  HOME
                </a>
                <a class="nav-link" href=" ">
                  PRODUCT
                </a>
                <a class="nav-link" href=" ">
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