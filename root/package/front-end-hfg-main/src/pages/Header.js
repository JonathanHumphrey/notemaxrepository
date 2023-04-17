import React from "react";
import UserModal from "./UserModal";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetUsersQuery } from "../features/usersApiSlice";
import { selectUserById } from "../features/usersApiSlice";

import "../styles/Header.css";

import logo from "../static/logo.png";

const Header = () => {
	useGetUsersQuery(undefined, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});
	const userId = localStorage.getItem("userId");
	const user = useSelector((state) => selectUserById(state, userId));

	const [isOpen, setOpen] = useState(false);
	const [currentPage, setPage] = useState("/dash");

	const handleModalOpen = () => {
		setOpen(true);
	};
	const handleCloseModal = () => {
		setOpen(false);
	};

	const handleClick = (event) => {
		const id = event.target.id;
		setPage(id);
	};
	return (
		<header>
			{user ? (
				<div className="left-block">
					<br></br>
					<div className="center-image">
						<Link to="/">
							<img
								alt="notemax logo"
								style={{
									height: 100,
									width: 170,
								}}
								src={logo}
							></img>
						</Link>
					</div>
					<div className="side-links">
						<Link
							className={currentPage === "home" ? "nav active" : "nav"}
							to="/dash"
							id="home"
							onClick={handleClick}
						>
							Home
						</Link>
						<Link
							className={currentPage === "notes" ? "nav active" : "nav"}
							to="/user-notes"
							id="notes"
							onClick={handleClick}
						>
							Your Notes
						</Link>
						<Link
							className={currentPage === "categories" ? "nav active" : "nav"}
							to="/user-categories"
							id="categories"
							onClick={handleClick}
						>
							Your Categories
						</Link>
					</div>
				</div>
			) : (
				<div className="left-blockNotlogged"></div>
			)}
			{user ? (
				<div className="right-block">
					<br></br>
					<br></br>

					<h2 id="user" onClick={handleModalOpen}>
						{user.name}
					</h2>
					<div className={isOpen ? "modal open" : "modal"}>
						<UserModal isOpen={isOpen} onClose={handleCloseModal} />
					</div>
				</div>
			) : (
				<div className="right-block">
					<br></br>
					<Link to="/login">
						<h2>Log In</h2>
					</Link>
					<Link to="https://www.youtube.com/watch?v=rRPQs_kM_nw&t=7s&ab_channel=10HoursMovies">
						<h2>Help</h2>
					</Link>
				</div>
			)}
		</header>
	);
};

export default Header;
