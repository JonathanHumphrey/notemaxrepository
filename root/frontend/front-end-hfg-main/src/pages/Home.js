import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="container">
			<div className="main-content">
				<h1 id="title">NoteMax</h1>
				<p id="splash-text">
					Lorem ipsum dolor sit amet consectetur. Aliquam nunc blandit et fusce
					enim donec nunc cursus. Accumsan vivamus sit morbi id. Tristique
					malesuada turpis vulputate porta.
				</p>
				<div className="links">
					<Link className="styled-link" to="/login">
						Log In
					</Link>
					<Link className="styled-link" to="/signup">
						Sign Up
					</Link>
				</div>
			</div>
			<div className="img-placeholder">
				<p className="placeholder">image to be placed later</p>
			</div>
		</div>
	);
};

export default Home;
