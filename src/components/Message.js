import React from 'react';
import {Link} from 'react-router-dom';

function removeMessage() {
	localStorage.removeItem('message')
}

const Message = () => {
	console.log(localStorage)
	return (
		<div className="messageUnderHeader">
			<h3>This is an incorrect username or password.</h3>
			<Link to="/" onClick={removeMessage()}>Please try again</Link>
		</div>
	)
}

export default Message