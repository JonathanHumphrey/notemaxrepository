import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoginMutation } from "../features/usersApiSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const [loginUser, { isLoading, isSuccess, isError, error }] =
		useLoginMutation();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const submit = async (e) => {
		e.preventDefault();
		await loginUser({ email, password });
	};
	const changeEmail = (e) => setEmail(e.target.value);
	const changePassword = (e) => setPassword(e.target.value);
	useEffect(() => {
		if (isSuccess) {
			setPassword("");
			setEmail("");
			navigate("/dash");
		}
	}, [isSuccess, navigate]);
	return (
		<div className="container">
			<form className="form" onSubmit={submit}>
				<div className="form__title-row">
					<h2>Login</h2>
				</div>
				<label className="form__label" htmlFor="email">
					email: <span className="nowrap">[3-20 letters]</span>
				</label>
				<input
					className="form__input"
					id="email"
					name="email"
					type="text"
					autoComplete="off"
					onChange={changeEmail}
				/>

				<label className="form__label" htmlFor="password">
					Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
				</label>
				<input
					className="form__input"
					id="password"
					name="password"
					type="password"
					onChange={changePassword}
				/>
				<button type="submit"></button>
			</form>
			<Link to="/dash"> Dashboard</Link>
		</div>
	);
};

export default LoginForm;
