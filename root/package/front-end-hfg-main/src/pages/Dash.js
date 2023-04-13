import React from "react";
import "../styles/Dash.css";
import FileUpload from "./FileUpload";
import UpdateTemplate from "./UpdateTemplate";

import ItemCard from "../components/ItemCard";

import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "../features/usersApiSlice";
import { useGetUsersQuery } from "../features/usersApiSlice";
import { ModalProvider, ModalContext, ModalRoot } from 'react-multi-modal';

// data imported from static to mimic the backend
import { dummyData } from "../static/dummyData";
import { userData } from "../static/userData";

const Dash = () => {
	useGetUsersQuery(undefined, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});
	const userId = localStorage.getItem("userId");
	const user = useSelector((state) => selectUserById(state, userId));

	{/* From previous modal opening settings, can delete now if needed - Lucas */}
	{/*
	const [modalOpen, setModalOpen] = useState(false);
	const handleModalOpen = () => {
		setModalOpen(true);
	};
	const handleCloseModal = () => {
		setModalOpen(false);
	};
	*/}

	if (user) {
		return (
			<div className="dash-container">
				<h2>Welcome, {user.name}</h2>
				<div className="template-container">
					<ModalProvider>
						<ModalContext.Consumer>
							{({ showModal, hideModal }) => (
							<>
								<div className="button-group">
									<button onClick={() =>  showModal({ component: UpdateTemplate})}>Update Template Preferences</button>
									<button onClick={() => showModal({ component: FileUpload })}>Upload Template</button>
								</div>
								<ModalRoot />
							</>
							)}
						</ModalContext.Consumer>
					</ModalProvider>
				</div>
				<div className="content-feed">
					{user.categories.map((category, id) => (
						<div className="user-categories" key={id}>
							<h4>{category}</h4>
							<br></br>
							{dummyData.map((data, index) =>
								user.categories.includes(data.category) &&
								category === data.category ? (
									<ItemCard
										key={index}
										author={data.author}
										file={data.file}
										date={data.date}
										likes={data.likes}
										dislikes={data.dislikes}
										category={data.category}
										comments={data.comments}
									/>
								) : null
							)}
						</div>
					))}
					<div className="user-templates">
						<h3>User's Templates</h3>
						{user.categories.map((category, id) => (
							<div className="user-feed" key={id}>
								<h4>{category}</h4>
								<br></br>
								{dummyData.map((data, index) =>
									user.categories.includes(data.category) &&
									category === data.category ? (
										<ItemCard
											key={index}
											author={user.name}
											file={data.file}
											date={data.date}
											likes={data.likes}
											dislikes={data.dislikes}
											category={data.category}
											comments={data.comments}
										/>
									) : null
								)}
							</div>
						))}
					</div>
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
