import React from "react";
import "./AddPost.css";
import useForm from "../UseForm/UseForm";
import { useAppContext } from "../../libs/contextLib";
import axios from "axios";
import { ROOT_URL } from "../../apiRoot";

const AddPost = (props) => {
	const { values, handleChange, handleSubmit, clearValues } =
		useForm(submitPost);
	const { loggedInUser, setLoggedInUser, headers } = useAppContext();

	async function submitPost() {
		const addPost = { ...values, parkName: props.parkName };

		if (addPost.rating == null) {
			alert("Please choose a rating for this park review!");
			return;
		}
		await axios
			.post(`${ROOT_URL}api/posts/${loggedInUser._id}/post`, addPost, headers)
			.then((response) =>
				setLoggedInUser({ ...loggedInUser, posts: response.data })
			)
			.catch((error) => {});
		clearValues();
	}

	return (
		<div className="row text-center">
			<div className="col ">
				<h4 className="title-post">Would you like to post a review?</h4>
			</div>
			<div className="post-form">
				<form onSubmit={handleSubmit}>
					<div className="input-group mb-3">
						<label className="input-group-text">Rating!</label>
						<select
							onChange={handleChange}
							className="form-select"
							id="rating"
							name="rating">
							<option>What would you rate this park?</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
						</select>
					</div>
					<div className="input-group mb-3">
						<textarea
							name="text"
							type="text"
							cols="50"
							rows="3"
							className="form-control"
							placeholder="Type your review here..."
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
