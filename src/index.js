import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
  } from 'react-router-dom';

import {Activities, Header, Home, LogIn, Message, MyRoutines, Register, Routines} from "./components";

const App = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [registerToken, setRegisterToken] = useState('');
	const [userToken, setUserToken] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

	useEffect(() => {
		{localStorage.getItem('Token') 
			? setLoggedIn(true) 
			: setLoggedIn(false)
		};
	}, []);

	return (
		<>
			<div className="app">
				<Header
					loggedIn={loggedIn}
					setLoggedIn={setLoggedIn}
				/>
				<Switch>
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
            {errorMessage?<Message setErrorMessage={setErrorMessage}></Message>:null}
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

				</Switch>
			</div>
		</>
	)
}


ReactDOM.render(
  <Router>
  <App />
  </Router>,
  document.getElementById('root')
);