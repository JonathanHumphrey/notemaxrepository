import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="container">
			<h3>What is Note Max?</h3>
			<p>
				Note Max is a template creation and sharing platform that allows each
				user to vote for their favorite template in each category in order to
				determine the optimal template for each specific purpose
			</p>
			<h3>Why Note Max?</h3>
			<p>
				Note Max aims to put all the templates you may need in one spot and
				allows users to effect which ones are at the top! No more sifting
				through lists of the included templates in your editor of choice
			</p>
			<div className="links">
				<Link to="/login">Log In</Link>
				<Link to="/signup">Sign Up</Link>
				<Link to="/dash"> Dashboard</Link>
			</div>
		</div>
	);
};

export default Home;
