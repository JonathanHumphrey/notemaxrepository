import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";

import { useUpdateLikesMutation } from "../features/fileApiSlice";

// Icon imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

import "../styles/FileViewer.css";

// For download
import {
	selectAllFiles,
	selectFileById,
	useGetFilesQuery,
} from "../features/fileApiSlice";

import FileSaver from "file-saver";
window.Buffer = window.Buffer || require("buffer").Buffer;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// COLORS: 060F09, 9767DA, C3B0FC
const FileViewer = () => {
	// likes and dislikes handlers
	const [updateLikes, { isSuccess }] = useUpdateLikesMutation();

	const location = useLocation();
	const data = location.state?.data;
	const [file, setFile] = useState("");
	const [pdfUrl, setUrl] = useState(null);
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const path = data.file.path;
	const buffer = Buffer.from(path, "base64");
	const blob = new Blob([buffer], { type: "application/pdf" });
	const url = URL.createObjectURL(blob);
	console.log(data);
	// Actually downloads the file
	const getPdf = async () => {
		FileSaver.saveAs(blob, "file.pdf");
	};
	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}
	function onDocumentLoadProgress() {
		console.log("progress");
	}

	const [likes, setLikes] = useState(data["likes"]);
	const handleLike = (event) => {
		const likeButton = document.getElementById("like");
		if (!likeButton.classList.contains("liked")) {
			likeButton.classList.toggle("liked");

			let ratings = likes + 1;
			setLikes(ratings);
			console.log(likes);
		} else {
			likeButton.classList.toggle("liked");
			setLikes(likes - 1);
		}
	};

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
									onDocumentLoadProgress={onDocumentLoadProgress}
									onLoadError={() => console.log("error")}
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
						<p>
							Lorem ipsum dolor sit amet consectetur. Aliquam nunc blandit et
							fusce enim donec nunc cursus. Accumsan vivamus sit morbi id.
							Tristique malesuada turpis vulputate porta.
						</p>
						<h3>Category: {data.category}</h3>
					</div>
					<div className="ratings">
						<p className="like-button" onClick={handleLike} id="like">
							<FontAwesomeIcon icon={faThumbsUp} /> {likes}
						</p>
						<p className="rating-item">
							<FontAwesomeIcon icon={faThumbsDown} /> {data["dislikes"]}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
	return content;
};

export default FileViewer;
