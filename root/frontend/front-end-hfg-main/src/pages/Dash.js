import React from "react";
import "../styles/Dash.css";
import FileUpload from "./FileUpload";
import ItemCard from "../components/ItemCard"

import { useState } from "react";
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

	const [modalOpen, setModalOpen] = useState(false);
	const handleModalOpen = () => {
		setModalOpen(true);
	};
	const handleCloseModal = () => {
		setModalOpen(false);
	};

	let fileBlobs = [
		{
		  id: 1,
		  author: "user123",
		  file: "https://example.com/files/file1.pdf",
		  date: "2022-01-01",
		  likes: 10,
		  dislikes: 2,
		  category: "Technology",
		  comments: [
			{ author: "user456", comment: "Great file!" },
			{ author: "user789", comment: "Very helpful, thanks!" }
		  ]
		},
		{
		  id: 2,
		  author: "user456",
		  file: "https://example.com/files/file2.docx",
		  date: "2022-02-15",
		  likes: 5,
		  dislikes: 0,
		  category: "Education",
		  comments: []
		},
		{
		  id: 3,
		  author: "user789",
		  file: "https://example.com/files/file3.png",
		  date: "2022-03-20",
		  likes: 2,
		  dislikes: 1,
		  category: "Art",
		  comments: [
			{ author: "user123", comment: "Nice image!" }
		  ]
		},
		{
		  id: 4,
		  author: "user123",
		  file: "https://example.com/files/file4.mp4",
		  date: "2022-04-30",
		  likes: 3,
		  dislikes: 3,
		  category: "Entertainment",
		  comments: [
			{ author: "user456", comment: "This video is hilarious!" },
			{ author: "user789", comment: "Not my cup of tea, but thanks for sharing." }
		  ]
		}
	  ];
	  

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
						<button onClick={handleModalOpen}> Upload Template </button>
					</p>
				</div>
				<div className="content-feed">
					<h2>Your Categories</h2>
					{user.categories.map((item, index) => (
						<div className="section" key={index}>
							<h4>{item}</h4>
							{fileBlobs.map(fileBlob => (
								<ItemCard 
									key={fileBlob.id} 
									author={fileBlob.author}
									category={fileBlob.category}
								/>
							))}
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
