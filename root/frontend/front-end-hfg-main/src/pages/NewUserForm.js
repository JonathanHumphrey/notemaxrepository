import React from "react";
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}/;

const NewUserForm = () => {
	return (
		<div className="container">
			<form>
				Name<input type="name" placeholder="Name"></input>
				Email<input type="email" placeholder="Email"></input>
				Password<input type="password" placeholder="Password"></input>
			</form>
			<Link to="/dash"> Dashboard</Link>
		</div>
	);
};

export default NewUserForm;
