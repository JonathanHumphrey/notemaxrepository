import { useState } from "react";
import "../styles/FileUpload.css";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function FileUpload(props) {
	const [file, setFile] = useState(null);
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData();

		formData.append("file", file);
		const pdfBlob = new Blob([file], { type: "application/pdf" });
		setFile(pdfBlob);
		console.log(file);
	};

	return (
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
}
export default FileUpload;
