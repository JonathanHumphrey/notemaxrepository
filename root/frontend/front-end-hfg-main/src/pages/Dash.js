import React from "react";
import "../styles/Dash.css";
import FileUpload from "./FileUpload";
import ItemCard from "../components/ItemCard";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "../features/usersApiSlice";
import { useGetUsersQuery } from "../features/usersApiSlice";
import { dummyData } from "../static/dummyData"

const Dash = () => {
	useGetUsersQuery(undefined, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});
	const userId = localStorage.getItem("userId");
	const user = useSelector((state) => selectUserById(state, userId));

	const [modalOpen, setModalOpen] = useState(false);
	const handleModalOpen = () => {
		setModalOpen(true);
	};
	const handleCloseModal = () => {
		setModalOpen(false);
	};


	
	
	if (user) {
		return (
			<div className="dash-container">
				<div>
					<FileUpload isOpen={modalOpen} onClose={handleCloseModal} />
				</div>
				<h2>Welcome, {user.name}</h2>
				<div className="button-group">
					<p>
						<Link> Create Template </Link>
					</p>
					<p>
						<button onClick={handleModalOpen} className="styled-link"> Upload Template </button>
					</p>
				</div>
				<div className="content-feed">
					<h2>Your Categories</h2>
					{user.categories.map((category, id) => 
						<div className="user-categories" key={id}>
							<h4>{category}</h4>
							<br></br>
							{dummyData.map((data, index) => (
								user.categories.includes(data.category) && category === data.category ?
									<ItemCard 
										key={index} 
										author={data.author}
										file={data.file}
										date={data.date}
										likes={data.likes}
										dislikes={data.dislikes}
										category={data.category}
										comments={data.comments}
									/> : null
							))}
						</div>
					)}
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

/* {user.categories.includes(dummyData.category)?
	dummyData.map((data, index) =>{
		<ItemCard author={data.author}/>
	})
:
null
} */