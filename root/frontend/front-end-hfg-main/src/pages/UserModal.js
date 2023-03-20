import "../styles/Modal.css";

import React from "react";
import { useNavigate } from "react-router-dom";

const UserModal = (props) => {
	const navigate = useNavigate();
	const logOut = () => {
		localStorage.removeItem("userId");
		navigate("/login");
		props.onClose();
	};
	return (
		<div className="modal-content">
			<ul>
				<li onClick={logOut}>Log Out</li>
			</ul>
			<button className="close-btn" onClick={props.onClose}>
				x
			</button>
		</div>
	);
};

export default UserModal;
