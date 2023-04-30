import React from "react";

import ItemCard from "../components/ItemCard";

import "../styles/YourNotes.css";
import { useSelector } from "react-redux";
import { selectUserById } from "../features/usersApiSlice";
import { selectAllFiles } from "../features/fileApiSlice";
import { useGetFilesQuery } from "../features/fileApiSlice";

const YourNotes = () => {
	useGetFilesQuery(undefined, {
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	const userId = localStorage.getItem("userId");
	const user = useSelector((state) => selectUserById(state, userId));
	const files = useSelector((state) => selectAllFiles(state));

	const content = (
		<div className="notes-container">
			{user.categories.map((category, id) => (
				<div className="user-categories" key={id}>
					<h4>{category}</h4>
					<br></br>
					{files.map((data, index) =>
						user.categories.includes(data.category) &&
						category === data.category &&
						userId === data.author ? (
							<ItemCard
								key={index}
								id={data._id}
								author={data.author}
								title={data.title}
								username={user.name}
								file={data.file}
								date={data.date}
								likes={data.likes}
								dislikes={data.dislikes}
								category={data.category}
								description={data.description}
								usersLiked={data.usersLiked}
								usersDisliked={data.usersDisliked}
							/>
						) : null
					)}
				</div>
			))}
		</div>
	);
	return content;
};

export default YourNotes;
