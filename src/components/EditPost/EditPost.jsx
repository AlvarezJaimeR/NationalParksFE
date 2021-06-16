import React from "react";
import "./EditPost.css";
import useForm from "../UseForm/UseForm";
import { useAppContext } from "../../libs/contextLib";
import axios from "axios";
import NavBar from "../NavBar/NavBar";

const AddPost = () => {
	const { values, handleChange, handleSubmit, clearValues } =
		useForm(submitPost);
	const { loggedInUser, setLoggedInUser, headers } = useAppContext();

	function submitPost() {
		console.log(values);
		axios
			.post(
				`http://localhost:5000/api/posts/${loggedInUser._id}/post`,
				values,
				headers
			)
			.then((response) =>
				setLoggedInUser({ ...loggedInUser, posts: response.data })
			)
			.catch((error) => {
				console.log(error);
			});
		clearValues();
	}

	return (
		<div className="row text-center">
			<NavBar tabActive="1" />
			<div className="col">
				<h6 className="subtitle">Would you like to post a review?</h6>
			</div>
			<div className="post-form">
				<form onSubmit={handleSubmit}>
					<div className="input-group mb-3">
						<textarea
							name="text"
							type="text"
							cols="60"
							rows="5"
							className="form-control"
							placeholder="Type away!"
							aria-label="Post time"
							aria-describedby="post-button"
							onChange={handleChange}
							value={values.text || ""}
						/>
						<button
							className="btn btn-outline-dark"
							type="submit"
							id="post-button">
							Post!
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddPost;
