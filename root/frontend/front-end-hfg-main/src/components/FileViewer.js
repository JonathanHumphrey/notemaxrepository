import React from "react"
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "../styles/FileViewer.css"



// COLORS: 060F09, 9767DA, C3B0FC
const FileViewer = () => {
	
		const location = useLocation();
		const data = location.state?.data;
		console.log(data)
	
	const content = (
		
		<div className="viewer-container">
			<div className="viewer-content">
				<div className="left">
					<div className="file-info">
						<div className="file-slot">
							
						</div>
						<p>Published: {data.date}</p>
						<div className="file-footer">
							<button className="download-btn">Download</button>
							<h2 className="author">Author: {data["author"]}</h2>
						</div>
					</div>
				</div>
				<div className="right">
					<div className="file-data">
						<h2>Description</h2>
						<p>Lorem ipsum dolor sit amet consectetur. Aliquam nunc blandit et fusce
						enim donec nunc cursus. Accumsan vivamus sit morbi id. Tristique
						malesuada turpis vulputate porta.
						</p>
						<h3>Category: {data.category}</h3>
					</div>
					<div className="ratings">
						<p className="rating-item"><FontAwesomeIcon icon={faThumbsUp} /> {data["likes"]}</p>
						<p className="rating-item"><FontAwesomeIcon icon={faThumbsDown} /> {data["dislikes"]}</p>	
					</div>
				</div>	
			</div>
		</div>
	);
	return content;
};

export default FileViewer;