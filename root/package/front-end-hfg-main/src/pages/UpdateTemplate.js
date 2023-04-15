import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "../features/usersApiSlice";
import { CATEGORIES } from "../config/categories";
import { useUpdateUserMutation } from "../features/usersApiSlice";

import "../styles/UpdateTemplate.css";
const UpdateTemplate = (props) => {
	const userId = localStorage.getItem("userId");
	const user = useSelector((state) => selectUserById(state, userId));

	const [updateUser] = useUpdateUserMutation();

	const [categories, setCategories] = useState(["Worksheets"]);
	const options = Object.values(CATEGORIES).map((category) => {
		return (
			<option key={category} value={category}>
				{" "}
				{category}
			</option>
		);
	});

	const onCategoriesChanged = (e) => {
		const values = Array.from(
			e.target.selectedOptions,
			(option) => option.value
		);
		setCategories(values);
	};

	const handleAddCategory = () => {
		const array = categories.filter((item) => !user.categories.includes(item));

		const obj = {
			id: userId,
			array: array,
		};
		const payload = updateUser(obj);

		console.log(payload);
	};
	const content = (
		<div className={props.isOpen ? "modal-container open" : "modal-container"}>
			<div className="update-content">
				<div className="select-wrapper">
					<select
						id="categories"
						name="categories"
						className={`form__select`}
						multiple={true}
						size="3"
						value={categories}
						onChange={onCategoriesChanged}
					>
						{options}
					</select>
				</div>
				<div>
					<button className="sub-btn" onClick={handleAddCategory}>
						Add Category
					</button>
					<button className="sub-btn">Delete Category</button>
				</div>
				<button className="close-btn" onClick={props.hideModal}>
					&#x2715;
				</button>
			</div>
		</div>
	);

	return props.isOpen && content;
};

export default UpdateTemplate;
