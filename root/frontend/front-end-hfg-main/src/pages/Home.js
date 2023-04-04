import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="container">
			<div className="rectangle">
			</div>
			<div className="text">
				<h1 id="title">NoteMax</h1>
				<p id="splash-text">
					Lorem ipsum dolor sit amet consectetur. Aliquam nunc blandit et fusce
					enim donec nunc cursus. Accumsan vivamus sit morbi id. Tristique
					malesuada turpis vulputate porta.
				</p>
				</div>
				
				<div className="links">
					<Link className="styled-link" to="/login">
						<a>Log In</a>
					</Link>
					</div>
					<div className="links">
					<Link className="styled-link" to="/signup">
						Sign Up
					</Link>
					
			</div>
			
		</div>
	);
};

export default Home;
