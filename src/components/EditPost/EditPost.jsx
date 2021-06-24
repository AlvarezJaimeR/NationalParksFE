import React from "react";
import "./EditPost.css";

function EditPost(props) {
	return (
		<div
			className="modal fade"
			id="staticBackdrop"
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			aria-labelledby="staticBackdropLabel"
			aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="staticBackdropLabel">
							Edit Post!
						</h5>
						<button
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>
					<div className="modal-body">{props.body}</div>
					<div className="modal-footer">
						<button className="btn btn-secondary" data-bs-dismiss="modal">
							Close
						</button>
						<button className="btn btn-primary" name="edit-post">
							Understood
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditPost;
