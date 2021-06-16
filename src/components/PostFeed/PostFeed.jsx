import React, { useEffect, useState } from "react";
import "./PostFeed.css";
import { useAppContext } from "../../libs/contextLib";
import axios from "axios";

const PostFeed = () => {
	const { loggedInUser, headers } = useAppContext();
	const [posts, setPosts] = useState([]);

	const buttonClick = (event, post) => {
		console.log("button", event);
		console.log("button", post);
		console.log("button", posts);

		switch (event.target.name) {
			case "like":
				break;
			case "dislike":
				break;
			case "delete":
				axios
					.put(
						`http://localhost:5000/api/posts/${loggedInUser._id}/${posts[post]._id}`,
						posts,
						headers
					)
					.then((res) => {
						console.log(res);
					})
					.catch((err) => {
						console.log(err);
						console.log(err.response.data);
					});
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/posts/${loggedInUser._id}`)
			.then((response) => setPosts(response.data));
	}, [loggedInUser]);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/posts/${loggedInUser._id}`)
			.then((response) => setPosts(response.data));
	}, [posts]);

	return posts.length === 0 ? (
		<div>
			<h3>There are currently no reviews for this park.</h3>
		</div>
	) : (
		<div className="row">
			<div className="row row-cols-1">
				<div className="col text-center">
					<h3 className="title-centered">Your Reviews!</h3>
				</div>
			</div>
			<div className="col">
				{posts.map((post, index) => (
					<div key={index} className="row row-cols-3 post-container">
						<div className="col-2">
							<div className="post-user-pic">
								<img src={loggedInUser.icon} alt="user icon" />
							</div>
						</div>
						<div className="col-8 main-post-body">
							<div className="row row-cols-1">
								<div className="col">
									<div className="post-body">{post.text}</div>
								</div>
							</div>
						</div>
						<div className="col-2">
							<div className="row">
								<button
									name="delete"
									onClick={(event) => buttonClick(event, index)}
									className="btn btn-outline-dark">
									Delete Post!
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PostFeed;
