import React from "react";
import "./EditPost.css";

function EditPost() {
	return (
		<div class="modal">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Modal title</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true"></span>
						</button>
					</div>
					<div class="modal-body">
						<p>Modal body text goes here.</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary">
							Save changes
						</button>
						<button
							type="button"
							class="btn btn-secondary"
							data-bs-dismiss="modal">
							Close
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
