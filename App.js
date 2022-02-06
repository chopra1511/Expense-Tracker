import './App.css';
import { Switch, Route } from "react-router-dom";
import AuthForm from './components/Auth/AuthForm';
import Welcome from './components/Layout/Welcome';
import Contact from './components/Pages/Contact';
import { useContext } from 'react';
import AuthContext from './store/auth-context';


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
      </Switch>
    </div>
  );
}

export default App;
