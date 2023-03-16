import React from "react";
import "../styles/Dash.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "../features/usersApiSlice";
import { useGetUsersQuery } from "../features/usersApiSlice";

const Dash = () => {
	useGetUsersQuery(undefined, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});
	const userId = localStorage.getItem("userId");
	const user = useSelector((state) => selectUserById(state, userId));
	if (user) {
		return (
			<div className="container">
				<h2>Welcome, {user.name}</h2>
				<div className="button-group">
					<p>
						<Link> Create Template </Link>
					</p>
					<p>
						<Link> Upload Template </Link>
					</p>
				</div>
				<div className="content-feed">
					<h2>Your Categories</h2>

					{user.categories.map((item, index) => (
						<div className="section" key={index}>
							<h4>{item}</h4>
						</div>
					))}
				</div>
				<div className="user-templates">
					<h3>User's Templates</h3>
					<p>
						This is where templates that the user created will appear, along
						with their stats
					</p>
				</div>
			</div>
		);
	}
};

export default Dash;
