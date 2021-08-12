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
        </Switch>
    </Router>
   );

}

export default App;
