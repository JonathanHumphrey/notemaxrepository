import React from "react";
import { Link } from "react-router-dom";

import { useDeleteFileMutation } from "../features/fileApiSlice";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import "../styles/ItemCard.css";

const ItemCard = (props) => {
	const userId = localStorage.getItem("userId");
	const navigate = useNavigate();
	const [deleteFile, { isSuccess }] = useDeleteFileMutation();

	const fileObject = {
		id: props.id,
		author: props.author,
		username: props.username,
		file: props.file,
		date: props.date,
		likes: props.likes,
		dislikes: props.dislikes,
		category: props.category,
		description: props.description,
		usersLiked: props.usersLiked,
		usersDisliked: props.usersDisliked,
	};

	const handleDelete = (event) => {
		if (!event.shiftKey) {
			alert("Shift + Click to Delete");
		} else {
			const fileId = props.id;
			const data = {
				id: fileId,
			};
			deleteFile(data);
			navigate("/dash");
		}
	};

	return (
		<div className="item-container" onClick={() => console.log(fileObject)}>
			{userId === props.author ? (
				<div className="icon">
					<FontAwesomeIcon icon={faTrashCan} onClick={handleDelete} />
				</div>
			) : null}
			<h3>{props.title}</h3>
			<h3>By: {props.username}</h3>
			<p>Likes: {props.likes}</p>
			<p>Dislikes: {props.dislikes}</p>

			<div className="link-slot">
				<Link id="file-link" to="/dash/view" state={{ data: fileObject }}>
					View File
				</Link>
			</div>
		</div>
	);
};

export default ItemCard;
