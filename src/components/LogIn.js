import React from 'react'

const LogIn = ({
	username,
	password,
	setUsername,
	setPassword,
	setUserToken,
	setLoggedIn }) => {

	const history = useHistory();

	const logInRequest = async (event) => {
		event.preventDefault();
		try {
			const data = await handleLogIn(username, password);
			if (data.error) {
				history.push("/message");
			} else {
				const token = data.token;
				localStorage.setItem(`Token`, token);
				setUserToken(token);
				setLoggedIn(true);
				setUsername(username);

				localStorage.setItem(`Username`, username);
				history.push("/");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<form
				onSubmit={logInRequest}>
				<div>
					<input
						required
						placeholder="Username"
						onChange={(event) => setUsername(event.target.value)}
						value={username}
					/>
				</div>
				<div>
					<input
						required
						name="password"
						placeholder="Password"
						type="password"
						onChange={(event) => setPassword(event.target.value)}
						value={password}
					/>
				</div>
				<button type="submit">Sign In</button>
				<Link to="/register">Register</Link>
			</form>
		</div>
	);
}

export default LogIn;