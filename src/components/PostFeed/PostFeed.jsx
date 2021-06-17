import React, { useEffect, useState } from "react";
import "./PostFeed.css";
import { useAppContext } from "../../libs/contextLib";
import axios from "axios";
import { Link } from "react-router-dom";

const PostFeed = (props) => {
	const { loggedInUser, headers } = useAppContext();
	const [posts, setPosts] = useState([]);
	const [update, setUpdate] = useState(false);
	console.log("post feed props", props);

	const buttonClick = (event, post) => {
		console.log("button", event);
		console.log("button", post);
		console.log("button", posts);

		switch (event.target.name) {
			case "delete":
				axios
					.put(
						`http://localhost:5000/api/posts/${loggedInUser._id}/delete/${posts[post]._id}`,
						posts,
						headers
					)
					.then((res) => {
						console.log(res);
						setUpdate(!update);
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
			.then((response) => {
				console.log(response.data);
				const filteredPosts = response.data.filter(
					(post) => post.parkName === props.parkName
				);
				console.log(filteredPosts);
				setPosts(filteredPosts);
			});
	}, [loggedInUser, update]);

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
									<h5>Rating: {post.rating}/5</h5>
								</div>
								<div className="col">
									<h3 className="post-body">{post.parkName}</h3>
								</div>
								<div className="col">
									<p className="post-body">{post.text}</p>
								</div>
							</div>
						</div>
						<div className="col-2">
							<div className="row">
								<Link
									to={{
										pathname: "/editPost",
										state: { posts: posts, index: index },
									}}>
									<p>Edit Post!</p>
								</Link>
							</div>
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
