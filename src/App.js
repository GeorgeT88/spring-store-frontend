import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ForgotPassword from './components/ForgotPassword';
import ProductCatalog from './components/ProductCatalog';
import AppBar from './components/AppBar';
import React, { useReducer } from 'react';

// Create context object
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export const AppContext = React.createContext();

  // Set up Initial State
const initialState = {

  inputText: '',

}

function reducer(state, action) {
  switch (action.type) {
      case 'UPDATE_INPUT':
          return {
              inputText: action.data
          };


      default:
          return initialState;
  }
}


function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("App State text:", state.inputText);


  return (
  
    <Router>
    <div className="App">
    <AppContext.Provider value={{ state, dispatch }}>
    <AppBar/>
  
        <Switch>
        <Route exact path = "/"><ProductCatalog/></Route>       
          <Route path = "/signUp"><SignUp/></Route>
          <Route path = "/signIn"><SignIn/></Route>
          <Route path = "/forgotPassword"><ForgotPassword/></Route>
        </Switch>
        </AppContext.Provider>
        </div>
    </Router>  
    
   );
}

export default App;
