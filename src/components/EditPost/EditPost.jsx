import React from "react";
import "./EditPost.css";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { useAppContext } from "../../libs/contextLib";
import UseForm from "../UseForm/UseForm";
import { Link } from "react-router-dom";
import "./EditPost.css";
import { ROOT_URL } from "../../apiRoot";

function EditPost(props) {
	//console.log(props.location.state);
	const { loggedInUser, setLoggedInUser, headers, parks } = useAppContext();
	const { values, handleChange, handleSubmit } = UseForm(editData);

	async function editData() {
		if (values.rating == null) {
			alert("Please choose a rating for this park review!");
			return;
		}

		await axios
			.put(
				`${ROOT_URL}api/posts/${loggedInUser._id}/edit/${props.location.state.post._id}`,
				values,
				headers
			)
			.then((response) => {
				alert("Post information updated!");
				//console.log(response);
				setLoggedInUser({ ...loggedInUser, posts: response.data });
			})
			.catch((error) => {
				//console.log(error);
			});
	}

	return (
		<div>
			<NavBar tabActive="1" />
			<div className="container">
				<div className="row top-title">
					<div className="col-12">
						<h1>Edit Post!</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-2"></div>
					<div className="col-8 edit-box">
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
							<label htmlFor="postText">Post Text:</label>
							<input
								placeholder={props.location.state.post.text}
								className="form-control"
								type="text"
								name="text"
								id="postText"
								value={values.text || ""}
								onChange={handleChange}
							/>
							<button type="submit" className="btn btn-success edit-update-btn">
								Update post!
							</button>
						</form>
					</div>
					<div className="col-2"></div>
				</div>
				<div className="row park-link">
					<div className="col-8"></div>
					<div className="col-4">
						<Link
							to={{
								pathname: "/specificPark",
								state: {
									parks: parks,
									name: props.location.state.post.parkName,
								},
							}}>
							<button className="btn btn-outline-primary">
								Return to the park page.
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditPost;
