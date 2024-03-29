import { formatUTCDate } from "../features/formatTime";

import { useState, useEffect } from "react";
import "../styles/FileUpload.css";
import { Document, Page, pdfjs } from "react-pdf";
import { useUploadFileMutation } from "../features/fileApiSlice";
import { useSelector } from "react-redux";
import { selectUserById } from "../features/usersApiSlice";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileUpload = (props) => {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	const userId = localStorage.getItem("userId");
	const user = useSelector((state) => selectUserById(state, userId));
	const [uploadFile, { isSuccess }] = useUploadFileMutation();
	const [file, setFile] = useState("");
	const [categories, setCategories] = useState(user.categories[0]);

	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);

	const [title, setTitle] = useState("");
	const [value, setValue] = useState("");
	const [remainingChars, setRemainingChars] = useState(180);

	useEffect(() => {
		if (isSuccess) {
			props.hideModal();
		}
	}, [isSuccess]);

	const options = Object.values(user.categories).map((category) => {
		return (
			<option key={category} value={category}>
				{" "}
				{category}
			</option>
		);
	});
	const onCategoriesChanged = (e) => {
		setCategories(e.target.value);
	};

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}
	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	const handleChange = (event) => {
		const inputValue = event.target.value;
		setValue(inputValue);

		const charsLeft = 180 - inputValue.length;
		setRemainingChars(charsLeft);
	};
	const handleTitle = (event) => {
		const titleInput = event.target.value;
		setTitle(titleInput);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();

		let date = new Date();
		let realDate = formatUTCDate(date);
		setLikes(0);
		setDislikes(0);

		console.log(file);
		const renamedFile = new File([file], userId + "-" + file.name, {
			type: file.type,
		});

		const formData = new FormData();
		formData.append("file", renamedFile);
		formData.append("author", userId);
		formData.append("username", user.name);
		formData.append("date", realDate);
		formData.append("likes", likes);
		formData.append("dislikes", dislikes);
		formData.append("category", categories);
		formData.append("title", title);
		formData.append("description", value);
		formData.append("usersLiked", []);
		formData.append("usersDisliked", []);

		const payload = await uploadFile({ formData });
		window.location.reload();
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
						<div className="title-wrapper">
							<label htmlFor="title">Document Title:</label>
							<input
								className="title-input"
								type="text"
								name="title"
								placeholder="Enter document title"
								onChange={handleTitle}
								value={title}
							/>
						</div>
						<div className="description-wrapper">
							<div className="description-header">
								<label htmlFor="title-description">Description:</label>
								<p>{remainingChars}</p>
							</div>
							<textarea
								className="description-input"
								type="text"
								id="title-description"
								name="title-description"
								placeholder="180 Char. limit"
								maxLength="180"
								wrap="soft"
								value={value}
								onChange={handleChange}
							/>
						</div>
					</div>
					<button className="sub-btn" type="submit">
						Upload
					</button>
				</form>
				<button className="close-btn" onClick={props.hideModal}>
					&#x2715;
				</button>
			</div>
		</div>
	);
	return props.isOpen && content;
};
export default FileUpload;
