import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
	selectUserById,
	useDeleteUserCategoryMutation,
} from "../features/usersApiSlice";
import { CATEGORIES } from "../config/categories";
import { useAddUserCategoryMutation } from "../features/usersApiSlice";

import "../styles/UpdateTemplate.css";
const UpdateTemplate = (props) => {
	const userId = localStorage.getItem("userId");
	const user = useSelector((state) => selectUserById(state, userId));

	const [addCategory] = useAddUserCategoryMutation();
	const [deleteCategory] = useDeleteUserCategoryMutation();

	const [categories, setCategories] = useState([]);
	const options = Object.values(CATEGORIES).map((category) => {
		return (
			<option key={category} value={category}>
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

		if (array === undefined) {
			console.log("nothing to add");
		} else {
			const payload = addCategory(obj);

			setCategories(payload.data.categories);
		}
	};
	const handleDeleteCategory = () => {
		const array = categories.filter((item) => user.categories.includes(item));

		const obj = {
			id: userId,
			array: array,
		};
		const payload = deleteCategory(obj);
		setCategories(payload.data.categories);
	};

	const content = (
		<div className={props.isOpen ? "modal-container open" : "modal-container"}>
			<div className="update-content">
				<div className="active-categories">
					<h2>Your Categories</h2>
					{user.categories.map((category, id) => (
						<p key={id} className="category">
							{category}
						</p>
					))}
				</div>
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
				<div className="buttons">
					<button className="sub-btn add" onClick={handleAddCategory}>
						Add Category
					</button>
					<button className="sub-btn del" onClick={handleDeleteCategory}>
						Delete Category
					</button>
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
