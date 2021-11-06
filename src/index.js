import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { Link } from "react-router-dom";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { clearCurrentUser } from "./auth";

import {
  Header,
  Register,
  Home,
  Activities,
  LogIn,
  Message,
  MyRoutines,
  Routines,
  SingleActivity,
  SingleRoutine,
} from "./components";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [registerToken, setRegisterToken] = useState("");
  const [userToken, setUserToken] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    {
      localStorage.getItem("Token") ? setLoggedIn(true) : setLoggedIn(false);
    }
  }, []);

  return (
    <>
      <div className="app">
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

        {loggedIn === false ? (
          <nav className="navBar">
            <Link className="navBarLink" to="/">
              Home
            </Link>
            <Link className="navBarLink" to="/login">
              Login
            </Link>
            <Link className="navBarLink" to="/routines">
              Routines
            </Link>
            <Link className="navBarLink" to="/activites">
              Activities
            </Link>
          </nav>
        ) : (
          <nav className="navBar">
            <Link className="navBarLink" to="/">
              Home
            </Link>
            <Link className="navBarLink" to="/routines">
              Routines
            </Link>
            <Link className="navBarLink" to="/myroutines">
              My Routines
            </Link>
            <Link className="navBarLink" to="/activities">
              Activities
            </Link>
            <button className="navBarLink" onClick={clearCurrentUser}>
              Logout
            </button>
          </nav>
        )}

        <Switch>
          {
            <Route exact path="/">
              <Home
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                setRegisterToken={setRegisterToken}
                userToken={userToken}
                setUserToken={setUserToken}
              />
            </Route>
          }

          <Route path="/register">
            <Register
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              registerToken={registerToken}
              setRegisterToken={setRegisterToken}
            />
          </Route>

          <Route path="/login">
            {errorMessage ? (
              <Message setErrorMessage={setErrorMessage}></Message>
            ) : null}
            <LogIn
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              setRegisterToken={setRegisterToken}
              userToken={userToken}
              setUserToken={setUserToken}
              setErrorMessage={setErrorMessage}
            />
          </Route>

          <Route path="/routines">
            <Routines />
          </Route>

          <Route path="/myroutines">
            <MyRoutines />
          </Route>

          <Route path="/activities">
            <Activities />
          </Route>

          <Route path="/SingleActivity/:activityId">
            <SingleActivity />
          </Route>

          <Route path="/SingleRoutine/:routineId">
            <SingleRoutine />
          </Route>
        </Switch>
      </div>
    </>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
