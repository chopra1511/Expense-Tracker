import './App.css';
import { Switch, Route } from "react-router-dom";
import AuthForm from './components/Auth/AuthForm';
import Welcome from './components/Layout/Welcome';
import Contact from './components/Pages/Contact';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <AuthForm />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/contact">
          <Contact/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
