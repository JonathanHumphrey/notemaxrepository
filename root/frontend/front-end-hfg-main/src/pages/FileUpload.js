import { formatUTCDate } from "../features/formatTime";

import { useState } from "react";
import "../styles/FileUpload.css";
import { Document, Page, pdfjs } from "react-pdf";
import { useUploadFileMutation } from "../features/fileApiSlice";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const FileUpload = (props) => {
	const [uploadFile, {isSuccess}] = useUploadFileMutation();
	const [file, setFile] = useState(null);
	const userId = localStorage.getItem("userId");
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	};
	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		
		var pdfData
		const reader = new FileReader();
		reader.readAsDataURL(file)
		try {
			reader.onloadend = function () {
				pdfData = reader.result.split(',')[1];
				console.log(pdfData)
				console.log(pdfData)
				setFile(pdfData);
				let date = new Date();
				let category = document.getElementById("category").value;
				let realDate = formatUTCDate(date)
				var fileBlob = {
					author: userId,
					file: pdfData,
					date: realDate,
					likes: 0,
					dislikes: 0,
					category: category,
					comments: []
				}
				
				const payload = uploadFile({fileBlob});
				console.log(payload)
			}
			

			
		} catch (error) {
			console.log(error)
		}
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
						<input 
							type="text"
							id="category"
						/>
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
	return content
}
export default FileUpload;
