import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

import Dashboard from './views/Dashboard'
import SignUp from './views/SignUp'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const axios = require('axios').default;
const ACCESS_TOKEN = "access_token";

// This example has 3 pages: a public page, a protected
// page, and a login screen. In order to see the protected
// page, you must first login. Pretty standard stuff.
//
// First, visit the public page. Then, visit the protected
// page. You're not yet logged in, so you are redirected
// to the login page. After you login, you are redirected
// back to the protected page.
//
// Notice the URL change each time. If you click the back
// button at this point, would you expect to go back to the
// login page? No! You're already logged in. Try it out,
// and you'll see you go back to the page you visited
// just *before* logging in, the public page.

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <AuthButton />

          <ul>
          <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/sign-in">Sign In</Link>
            </li>
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
          </ul>

          <Switch>
          <Route path="/sign-in">
            <LoginPage />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  signin(cb, username, password) {
    console.log(username)
    return axios.post('http://localhost:8762/login', {
      username,
      password
    }).then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.headers.authorization);
        console.log(response.headers.authorization);

        fakeAuth.isAuthenticated = true;
    }).catch((error) => {
        console.log(error)
    })
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (cb, username, password) => {
    return fakeAuth.signin(() => {
      setUser("user");
      cb();
    }, username, password);
  };

  const signout = cb => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}

function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  let { from } = location.state || { from: { pathname: "/" } };
  let onSignIn = () => {
    auth.signin(() => {
      history.replace(from);
    }, username, password);
  };

  let handleChangeUsername = (event) => {
    setUsername(event.target.value)  
  }

  let handleChangePassword = (event) => {
    setPassword(event.target.value)  
    // this.setState({ password: event.target.value })  
  }

  return (
    <div>
      <h2>Sing In</h2>

      <form noValidate autoComplete="off">
          <TextField id="standard-basic" label="Username" value={username} onChange={handleChangeUsername} />
          <TextField id="filled-basic" label="Password" value={password} onChange={handleChangePassword}/>
      </form>

      <Button variant="contained" color="primary" onClick={onSignIn}>Sign In</Button>
      <Button variant="outlined" color="primary">Sign Up</Button>
    </div>
  );
}
