import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import ForgotPassword from './views/ForgotPassword';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
        <Switch>
          <Route exact path = "/"><SignIn/></Route>
          <Route path = "/signUp"><SignUp/></Route>
          <Route path = "/signIn"><SignIn/></Route>
          <Route path = "/forgotPassword"><ForgotPassword/></Route>
        </Switch>
    </Router>
   );

}

export default App;
