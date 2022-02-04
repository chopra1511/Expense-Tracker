import './App.css';
import { Switch, Route } from "react-router-dom";
import AuthForm from './components/Auth/AuthForm';
import Welcome from './components/Layout/Welcome';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/auth" exact>
          <AuthForm />
        </Route>
        <Route path="/">
          <Welcome />
        </Route>  
      </Switch>
    </div>
  );
}

export default App;
