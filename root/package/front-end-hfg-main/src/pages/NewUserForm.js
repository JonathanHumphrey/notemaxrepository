import "../styles/NewUserLogin.css";

import React from "react";
import { useAddNewUserMutation } from "../features/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CATEGORIES } from "../config/categories";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}/;
const EMAIL_REGEX =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const NewUserForm = () => {
	const [addNewUser, { isLoading, isSuccess, isError, error }] =
		useAddNewUserMutation();

	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [validName, setValidName] = useState(false);
	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [categories, setCategories] = useState(["Worksheets"]);

	useEffect(() => {
		setValidName(USER_REGEX.test(name));
	}, [name]);

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);
	useEffect(() => {
		setValidPassword(PWD_REGEX.test(password));
	}, [password]);

	useEffect(() => {
		if (isSuccess) {
			setName("");
			setPassword("");
			setEmail("");
			setCategories([]);
			navigate("/login");
		}
	}, [isSuccess, navigate]);
	const onnameChanged = (e) => setName(e.target.value);
	const onPasswordChanged = (e) => setPassword(e.target.value);
	const onEmailChanged = (e) => setEmail(e.target.value);

	const onCategoriesChanged = (e) => {
		const values = Array.from(
			e.target.selectedOptions, //HTMLCollection
			(option) => option.value
		);
		setCategories(values);
	};

	const canSave =
		[categories.length, validName, validPassword].every(Boolean) && !isLoading;

	const onSaveUserClicked = async (e) => {
		e.preventDefault();
		if (canSave) {
			console.log(name, password, categories);
			await addNewUser({ name, email, password, categories });
		}
	};

	const options = Object.values(CATEGORIES).map((category) => {
		return (
			<option key={category} value={category}>
				{" "}
				{category}
			</option>
		);
	});
	const errClass = isError ? "errmsg" : "";
	const validUserClass = !validName
		? "form__input--incomplete"
		: "form__input--complete";
	const validPwdClass = !validPassword
		? "form__input--incomplete"
		: "form__input--complete";
	const validEmailClass = !validEmail
		? "form__input--incomplete"
		: "form__input--complete";
	const validCategoriesClass = !Boolean(categories.length)
		? "form__input--incomplete"
		: "";

	const content = (
		<>
			<div className="page-body">
				<div className="image">Insert Image Here</div>
				<div className="form-container">
					<p className={errClass}>{error?.data?.message}</p>

					<form className="form" onSubmit={onSaveUserClicked}>
						<div className="form__title-row">
							<h2>Sign Up</h2>
						</div>
						<label className="form__label" htmlFor="name">
							Name
						</label>
						<input
							className={`form__input ${validUserClass}`}
							id="name"
							name="name"
							type="text"
							autoComplete="off"
							value={name}
							onChange={onnameChanged}
						/>

						<label className="form__label" htmlFor="email">
							Email
						</label>
						<input
							className={`form__input ${validEmailClass}`}
							id="email"
							name="email"
							type="text"
							autoComplete="off"
							value={email}
							onChange={onEmailChanged}
						/>

						<label className="form__label" htmlFor="password">
							Password
						</label>
						<input
							className={`form__input ${validPwdClass}`}
							id="password"
							name="password"
							type="password"
							value={password}
							onChange={onPasswordChanged}
							autoComplete="off"
						/>

						<label className="form__label" htmlFor="categories">
							What are you most interested in?
						</label>
						{/*
							<div className="form__row">
								<button className="btn-group btn-group-select" title="Sign Up" disabled={!canSave}>
									Notes
								</button>
								<button className="btn-group btn-group-select" title="Sign Up" disabled={!canSave}>
									Templates
								</button>
							</div>
						 */}

						<div className="select-wrapper">
							<select
								id="categories"
								name="categories"
								className={`form__select ${validCategoriesClass}`}
								multiple={true}
								size="3"
								value={categories}
								onChange={onCategoriesChanged}
							>
								{options}
							</select>
						</div>

						<button
							className="btn-group btn-group-sumbit"
							title="Sign Up"
							disabled={!canSave}
						>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</>
	);
	return content;
};

export default NewUserForm;
