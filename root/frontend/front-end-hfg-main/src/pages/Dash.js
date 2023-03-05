import React from "react";
import "../styles/Dash.css";
import { Link } from "react-router-dom";

const Dash = () => {
	return (
		<div className="container">
			<h2>Dash</h2>
			<div className="button-group">
				<p>
					<Link> Create Template </Link>
				</p>
				<p>
					<Link> Upload Template </Link>
				</p>
			</div>
			<div className="content-feed">
				<h3>Content Feed</h3>
				<p>
					Here is where content that aligns with the user's interests will show
					up and they can upvote, downvote, or comment on templates uploaded by
					other users
				</p>
			</div>
			<div className="user-templates">
				<h3>User's Templates</h3>
				<p>
					This is where templates that the user created will appear, along with
					their stats
				</p>
			</div>
		</div>
	);
};

export default Dash;
