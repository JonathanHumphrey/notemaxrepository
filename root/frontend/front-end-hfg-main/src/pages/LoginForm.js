import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
	return (
		<div className="container">
			<form>
				Name<input type="name" placeholder="Name"></input>
				Password<input type="password" placeholder="Password"></input>
			</form>
			<Link to="/dash"> Dashboard</Link>
		</div>
	);
};

export default LoginForm;
