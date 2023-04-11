import React from "react";
import UserModal from "./UserModal";
//import logo from './logo2.png';


import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetUsersQuery } from "../features/usersApiSlice";
import { selectUserById } from "../features/usersApiSlice";

import logo from "../static/logo.png"

const Header = () => {

	useGetUsersQuery(undefined, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});
	const userId = localStorage.getItem("userId");
	const user = useSelector((state) => selectUserById(state, userId));

	const [isOpen, setOpen] = useState(false);

	const handleModalOpen = () => {
		setOpen(true);
	};
	const handleCloseModal = () => {
		setOpen(false);
	};

	return (
		<header>
			<div className="left-block">
			<br></br>
				<div className="center-image">
				<img style={{
					height: 100,
					width: 170,
				}}
				src={logo }  >
				</img>
				</div>
				<br></br>
				<br></br>
				<br></br>
				<h5>Home</h5>
				<h5>Your Notes</h5>
				<h5>Templates</h5>
			</div>
			{user ? (
				<div className="right-block" >
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
					<br></br>
					<h2>Log In</h2>
					<h2>Help</h2>
				</div>
			)}
		</header>
	);
};

export default Header;
