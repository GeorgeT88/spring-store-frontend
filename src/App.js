import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ForgotPassword from './components/ForgotPassword';
import ProductCatalog from './components/ProductCatalog';
import UserSettings from './components/UserSettings';
import NavBar from './components/NavBar';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/configureStore';

// Create context object
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  return (
  
    <Router>
    <div className="App">
    <Provider store={store}>
    <NavBar/>   
        <Switch>
          <Route exact path = "/"><ProductCatalog/></Route>       
          <Route path = "/signUp"><SignUp/></Route>
          <Route path = "/signIn"><SignIn/></Route>
          <Route path = "/forgotPassword"><ForgotPassword/></Route>
          <Route path = "/userSettings"><UserSettings/></Route>
        </Switch>
        </Provider>
        </div>
    </Router>  
    
   );
}

export default App;
