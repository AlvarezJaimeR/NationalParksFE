import React from "react";
import "./EditPost.css";

function EditPost() {
	return (
		<div
			className="modal fade"
			id="staticBackdrop"
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			tabIndex="-1"
			aria-labelledby="staticBackdropLabel"
			aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="staticBackdropLabel">
							Modal title
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>
					<div className="modal-body">...</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							data-bs-dismiss="modal">
							Close
						</button>
						<button type="button" className="btn btn-primary">
							Understood
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditPost;

/* <div>
			<div className="modalBackground">
				<div className="modalContainer">
					<div className="close-button">
						<button onClick={() => setOpenModal(false)}> X </button>
					</div>
					<div className="title">
						<h1>Edit Post!</h1>
					</div>
					<div className="body">
						<p>This is where we are going to edit the post.</p>
					</div>
					<div className="footer">
						<button
							className="btn btn-danger"
							onClick={() => setOpenModal(false)}>
							Cancel
						</button>
						<button className="btn btn-success">Continue</button>
					</div>
				</div>
			</div>
		</div> */
