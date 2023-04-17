import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import Cookies from "js-cookie";

import { useUpdateLikesMutation } from "../features/fileApiSlice";
import { useUpdateDislikesMutation } from "../features/fileApiSlice";
import { selectFileById } from "../features/fileApiSlice";

// Icon imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

import "../styles/FileViewer.css";

// For download

import FileSaver from "file-saver";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// COLORS: 060F09, 9767DA, C3B0FC
const FileViewer = () => {
	const location = useLocation();
	const data = location.state?.data;
	const file = useSelector((state) => selectFileById(state));
	console.log(file);

	// likes and dislikes handlers
	const [updateLikes] = useUpdateLikesMutation();
	const [updateDislikes] = useUpdateDislikesMutation();

	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const path = data.file.path;
	const buffer = Buffer.from(path, "base64");
	const blob = new Blob([buffer], { type: "application/pdf" });
	const url = URL.createObjectURL(blob);

	// Actually downloads the file
	const getPdf = async () => {
		FileSaver.saveAs(blob, "file.pdf");
	};
	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	const [likes, setLikes] = useState(data["likes"]);
	const handleLike = async (event) => {
		const ratedFiles = Cookies.get("rated_files") || "";
		Cookies.set("rated_files", `${ratedFiles}, ${data["id"]}`);
		console.log(Cookies.get("rated_files"));

		const likeButton = document.getElementById("like");
		if (!likeButton.classList.contains("liked")) {
			likeButton.classList.toggle("liked");
			const payload = await updateLikes(data["id"]);
			console.log(payload.data);

			setLikes(payload.data.likes);
			console.log(likes);
		} else {
			likeButton.classList.toggle("liked");
			setLikes(likes - 1);
		}
	};

	const [dislikes, setDislikes] = useState(data["dislikes"]);
	const handleDislike = async () => {
		const dislikeButton = document.getElementById("dislike");

		if (!dislikeButton.classList.contains("disliked")) {
			dislikeButton.classList.toggle("disliked");

			const payload = await updateDislikes(data["id"]);
			setDislikes(payload.data.dislikes);
		}
	};
	console.log(dislikes);
	const content = (
		<div className="viewer-container">
			<div className="viewer-content">
				<div className="left">
					<div className="file-info">
						<div className="file-slot">
							{buffer ? (
								<Document
									file={url}
									onDocumentLoadSuccess={onDocumentLoadSuccess}
								>
									<Page pageNumber={pageNumber} />
								</Document>
							) : null}
						</div>
						<p>Published: {data.date}</p>
						<div className="file-footer">
							<button className="download-btn" onClick={getPdf}>
								Download
							</button>
							<h2 className="author">Author: {data["username"]}</h2>
						</div>
					</div>
				</div>
				<div className="right">
					<div className="file-data">
						<h2>Description</h2>
						<p>{data.description}</p>
						<h3>Category: {data.category}</h3>
					</div>
					<div className="ratings">
						<p className="like-button" onClick={handleLike} id="like">
							<FontAwesomeIcon icon={faThumbsUp} /> {likes}
						</p>
						<p className="dislike-button" onClick={handleDislike} id="dislike">
							<FontAwesomeIcon icon={faThumbsDown} /> {dislikes}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
	return content;
};

export default FileViewer;
