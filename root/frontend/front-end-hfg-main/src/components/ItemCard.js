import React from "react"
import { Link } from "react-router-dom";


import "../styles/ItemCard.css";

const ItemCard = (props) => {
	//const [data, setData] = useState()
	const fileObject = {
		author: props.author,
		file: props.file,
		date: props.date,
		likes: props.likes,
		dislikes: props.dislikes,
		category: props.category,
		comments: props.comments,
	}
	//setData(fileObject)
	return (
		<div className="item-container" onClick={() => console.log(fileObject)}>
			
			<h3>{props.author}</h3>
			<p>Likes: {props.likes}</p>
			<p>Dislikes: {props.dislikes}</p>

			<div className="link-slot">
				<Link id="file-link" to="/dash/view" state={{data: fileObject}}>
					View File
				</Link>
			</div>
		</div>
	);
};

export default ItemCard;
