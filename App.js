import './App.css';
import { Switch, Route } from "react-router-dom";
import AuthForm from './components/Auth/AuthForm';
import Welcome from './components/Layout/Welcome';
import Contact from './components/Pages/Contact';
import { useContext } from 'react';
import AuthContext from './store/auth-context';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetCode from './components/Auth/ResetCode';
import NewPassword from './components/Auth/NewPassword';


function App() {

 const authCtx = useContext(AuthContext);
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <AuthForm />
        </Route>
        {authCtx.isLoggedIn && (
          <Route path="/welcome">
            <Welcome />
          </Route>
        )}
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/forgotPassword">
          <ForgotPassword />
        </Route>
        <Route path="/reset">
          <ResetCode />
        </Route>
        <Route path="/newpass">
          <NewPassword/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
