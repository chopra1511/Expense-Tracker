import { NavLink } from "react-router-dom";

const Welcome = () => {
    return (
      <div>
        <h1>Welcome!</h1>
        <NavLink to="/auth">LogIn/SignIn</NavLink>
      </div>
    );
};

export default Welcome;