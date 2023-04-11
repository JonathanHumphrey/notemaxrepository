import { formatUTCDate } from "../features/formatTime";

import { useState } from "react";
import "../styles/FileUpload.css";
import { Document, Page, pdfjs } from "react-pdf";
import { useUploadFileMutation } from "../features/fileApiSlice";
import { CATEGORIES } from "../config/categories";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileUpload = (props) => {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	const userId = localStorage.getItem("userId");
	const [uploadFile, { isSuccess }] = useUploadFileMutation();
	const [file, setFile] = useState("");
	const [categories, setCategories] = useState("");
	const [author, setAuthor] = useState("");
	const [formattedDate, setDate] = useState("");
	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);

	const options = Object.values(CATEGORIES).map((category) => {
		return (
			<option key={category} value={category}>
				{" "}
				{category}
			</option>
		);
	});
	const onCategoriesChanged = (e) => {
		console.log(categories);
		setCategories(e.target.value);
	};

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}
	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();

		let date = new Date();
		let realDate = formatUTCDate(date);
		setLikes(0);
		setDislikes(0);
		console.log(categories);

		console.log(file);
		const renamedFile = new File([file], userId + "-" + file.name, {
			type: file.type,
		});

		console.log(renamedFile);
		const formData = new FormData();
		formData.append("file", renamedFile);
		formData.append("author", userId);
		formData.append("date", realDate);
		formData.append("likes", likes);
		formData.append("dislikes", dislikes);
		formData.append("category", categories);

		for (var key of formData.entries()) {
			console.log(key[0] + ", " + key[1]);
		}
		const payload = await uploadFile({ formData });
		console.log(payload);
	};

	const content = (
		<div className={props.isOpen ? "modal-container open" : "modal-container"}>
			<div className="content">
				<form onSubmit={handleSubmit}>
					<input type="file" onChange={handleFileChange}></input>
					<div className="pdf-viewer">
						<Document
							file={file ? file : null}
							onLoadSuccess={onDocumentLoadSuccess}
						>
							<Page pageNumber={pageNumber} />
						</Document>
						<p>
							Page {pageNumber} of {numPages}
						</p>
						<label htmlFor="category"> Category: </label>
						<div className="select-wrapper">
							<select
								id="categories"
								name="categories"
								className={`form__select $`}
								multiple={false}
								size="3"
								value={categories}
								onChange={onCategoriesChanged}
							>
								{options}
							</select>
						</div>
					</div>
					<button className="sub-btn" type="submit">
						Upload
					</button>
				</form>
				<button className="close-btn" onClick={props.onClose}>
					Close
				</button>
			</div>
		</div>
	);
	return content;
};
export default FileUpload;
