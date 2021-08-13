import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import ForgotPassword from './views/ForgotPassword';
import ProductCatalog from './views/ProductCatalog';
import AppBar from './views/AppBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
    <div className="App">
    <AppBar />
        <Switch>
        <Route exact path = "/"><ProductCatalog/></Route>
          <Route path = "/signUp"><SignUp/></Route>
          <Route path = "/signIn"><SignIn/></Route>
          <Route path = "/forgotPassword"><ForgotPassword/></Route>
        </Switch>
        </div>
    </Router>  
   );
}

export default App;
