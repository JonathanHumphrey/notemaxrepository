import "../styles/NewUserLogin.css";

import React from "react";
import { Link } from "react-router-dom";
import { useAddNewUserMutation } from "../features/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CATEGORIES } from "../config/categories";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}/;

const NewUserForm = () => {
	const [addNewUser, { isLoading, isSuccess, isError, error }] =
		useAddNewUserMutation();

	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [validUsername, setValidUsername] = useState(false);
	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [categories, setCategories] = useState(["Worksheets"]);

	useEffect(() => {
		setValidUsername(USER_REGEX.test(username));
	}, [username]);

	useEffect(() => {
		setValidPassword(PWD_REGEX.test(password));
	}, [password]);

	useEffect(() => {
		if (isSuccess) {
			setUsername("");
			setPassword("");
			setCategories([]);
			navigate("/dash");
		}
	}, [isSuccess, navigate]);
	const onUsernameChanged = (e) => setUsername(e.target.value);
	const onPasswordChanged = (e) => setPassword(e.target.value);

	const onCategoriesChanged = (e) => {
		const values = Array.from(
			e.target.selectedOptions, //HTMLCollection
			(option) => option.value
		);
		setCategories(values);
	};

	const canSave =
		[categories.length, validUsername, validPassword].every(Boolean) &&
		!isLoading;

	const onSaveUserClicked = async (e) => {
		e.preventDefault();
		if (canSave) {
			console.log(username, password, categories);
			//NEED BACKEND END POINT TO BE FINISHED BEFORE UNCOMMENTING THIS
			//await addNewUser({ username, password, categories });
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
	const validUserClass = !validUsername ? "form__input--incomplete" : "";
	const validPwdClass = !validPassword ? "form__input--incomplete" : "";
	const validCategoriesClass = !Boolean(categories.length)
		? "form__input--incomplete"
		: "";

	const content = (
		<>
			<div className="container">
				<p className={errClass}>{error?.data?.message}</p>

				<form className="form" onSubmit={onSaveUserClicked}>
					<div className="form__title-row">
						<h2>New User</h2>
						<div className="form__action-buttons">
							<button className="icon-button" title="Save" disabled={!canSave}>
								Save
							</button>
						</div>
					</div>
					<label className="form__label" htmlFor="username">
						Username: <span className="nowrap">[3-20 letters]</span>
					</label>
					<input
						className={`form__input ${validUserClass}`}
						id="username"
						name="username"
						type="text"
						autoComplete="off"
						value={username}
						onChange={onUsernameChanged}
					/>

					<label className="form__label" htmlFor="password">
						Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
					</label>
					<input
						className={`form__input ${validPwdClass}`}
						id="password"
						name="password"
						type="password"
						value={password}
						onChange={onPasswordChanged}
					/>

					<label className="form__label" htmlFor="roles">
						Pick at least one Category you are interested in:
					</label>
					<select
						id="roles"
						name="roles"
						className={`form__select ${validCategoriesClass}`}
						multiple={true}
						size="3"
						value={categories}
						onChange={onCategoriesChanged}
					>
						{options}
					</select>
				</form>
				<Link to="/dash"> Dashboard</Link>
			</div>
		</>
	);
	return content;
};

export default NewUserForm;
