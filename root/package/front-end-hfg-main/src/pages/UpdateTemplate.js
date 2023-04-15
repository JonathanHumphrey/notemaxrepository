import React from 'react'

const UpdateTemplate = (props) => {
    const content = (
    <div className={props.isOpen ? "modal-container open" : "modal-container"}>
        <div className="content">
			<h3>My Liked Categories</h3>
            <button className="sub-btn">Add Category</button>
            <button class="sub-btn">Delete Category</button>
            <button className="close-btn" onClick={props.hideModal}>
				Close
			</button>
		</div>
    </div>
    )

    return props.isOpen && content;
}

export default UpdateTemplate
