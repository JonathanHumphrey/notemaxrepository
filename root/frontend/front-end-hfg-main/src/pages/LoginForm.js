import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoginMutation } from "../features/usersApiSlice";
import { useNavigate } from "react-router-dom";
import "../styles/NewUserLogin.css";

const LoginForm = () => {
	const [loginUser, { isSuccess}] = useLoginMutation();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [validUser, setValidUser] = useState(true)

	const submit = async (e) => {
		e.preventDefault();
		try {
			//await loginUser({ email, password });
			const payload = await loginUser({ email, password });
			localStorage.setItem("userId", payload.data._id);
			document.location.reload();
		} catch (error) {
			console.log(error)
			setValidUser(false)
		}
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

	const invalidClass = !validUser ? "invalid" : "" 

	const content = (
		<div className="form-container">
			<form className="form" onSubmit={submit}>
				<div className="form__title-row">
					<h2>Login</h2>
				</div>
				{!validUser ? 
				<p className={`help-text ${invalidClass}`}>Invalid Credentials</p>:
				null}
				<label className="form__label" htmlFor="email">
					email: <span className="nowrap"></span>
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
					Password: <span className="nowrap"></span>
				</label>
				<input
					className="form__input"
					id="password"
					name="password"
					type="password"
					onChange={changePassword}
				/>
				<button type="submit" className="btn-group">Submit</button>
			</form>
		</div>
	);
	return content
};

export default LoginForm;
