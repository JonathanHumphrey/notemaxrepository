import React from "react"
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

import "../styles/FileViewer.css"


const FileViewer = () => {
	
		const location = useLocation();
		const data = location.state?.data;
		console.log(data)
	
	const content = (
		<div className="viewer-container">
			<div className="viewer-content">

				<div className="left">
					<h3>{data["author"]}</h3>
					<div className="file-info">
						<p>Category: {data.category}</p>
						<div className="file-slot">
							<h3>{data['file']}</h3>
						</div>
						<p>Published: {data.date}</p>
					</div>
				</div>
				<div className="right">
					<div className="ratings">
						<p><FontAwesomeIcon icon={faThumbsUp} /> {data["likes"]}</p>
						<p><FontAwesomeIcon icon={faThumbsDown} /> {data["dislikes"]}</p>	
					</div>	
					<div className="comment-section">
						{data.comments.map((comment, index) => (
							<div className="comment">
								<p><strong>username{index}:</strong></p>
								<p className="comment-body">{comment}</p>
							</div>
						))}
						<textarea className="comment-box"
							placeholder="180 Character Limit"
							required="true"
							maxlength={180}
						></textarea>
						<button>submit</button>
					</div>	
				</div>	
			</div>
			
		</div>
	);
	return content;
};

export default FileViewer;