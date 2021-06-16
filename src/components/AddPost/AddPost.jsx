import React from "react";
import "./AddPost.css";
import useForm from "../UseForm/UseForm";
import { useAppContext } from "../../libs/contextLib";
import axios from "axios";

const AddPost = (props) => {
	const { values, handleChange, handleSubmit, clearValues } =
		useForm(submitPost);
	const { loggedInUser, setLoggedInUser, headers } = useAppContext();

	async function submitPost() {
		console.log(values);
		console.log(props);

		const addPost = { ...values, parkName: props.parkName };
		console.log(addPost);

		if (addPost.rating == null) {
			alert("Please choose a rating for this park review!");
			return;
		}
		await axios
			.post(
				`http://localhost:5000/api/posts/${loggedInUser._id}/post`,
				addPost,
				headers
			)
			.then((response) =>
				setLoggedInUser({ ...loggedInUser, posts: response.data })
			)
			.catch((error) => {
				console.log(error);
				console.log(error.response.data);
			});
		clearValues();
	}

	return (
		<div className="row text-center">
			<div className="col">
				<h6 className="subtitle">Would you like to post a review?</h6>
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
