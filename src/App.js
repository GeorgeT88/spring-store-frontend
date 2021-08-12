import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
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
        </Switch>
    </Router>
   );

}

export default App;
