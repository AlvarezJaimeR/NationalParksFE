import React, { useEffect, useState } from "react";
import "./PostFeed.css";
import { useAppContext } from "../../libs/contextLib";
import axios from "axios";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { ROOT_URL } from "../../apiRoot";

const PostFeed = (props) => {
	const { loggedInUser, headers } = useAppContext();
	const [posts, setPosts] = useState([]);
	const [update, setUpdate] = useState(false);

	const buttonClick = (event, post) => {
		switch (event.target.name) {
			case "edit":
				setUpdate(!update);
				break;
			case "delete":
				axios
					.put(
						`${ROOT_URL}api/posts/${loggedInUser._id}/delete/${posts[post]._id}`,
						posts,
						headers
					)
					.then((res) => {
						setUpdate(!update);
					})
					.catch((err) => {});
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		axios.get(`${ROOT_URL}api/posts/${loggedInUser._id}`).then((response) => {
			const filteredPosts = response.data.filter(
				(post) => post.parkName === props.parkName
			);
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
			<div className="container post-container">
				{posts.map((post, index) => (
					<div key={index} className="row">
						<div className="col-2">
							<div className="post-user-icon">
								<img src={loggedInUser.icon} alt="user icon" />
							</div>
						</div>
						<div className="col-10 main-post-body">
							<div className="row">
								<div className="col">
									<div className="row">
										<div className="col-3"></div>
										<div className="col-5">
											<h3 className="post-body">{post.parkName}</h3>
										</div>
										<div className="col-2"></div>
										<div className="col-2">
											<h5>Visit Rating: {post.rating}/5</h5>
										</div>
									</div>
									<div className="row">
										<h6>
											Posted on:{" "}
											{dateFormat(post.date, "mmmm dS, yyyy --- h:MM:ss TT")}
										</h6>
										<h5 className="post-body">Review: {post.text}</h5>
									</div>
								</div>
								<div className="row btn-layout">
									<div className="col-9"> </div>
									<div className="col-3 btn-group">
										<Link
											to={{
												pathname: "/editPost",
												state: { post: post, index: index },
											}}>
											<button className="btn btn-outline-secondary">
												Edit Post!
											</button>
										</Link>
										<button
											name="delete"
											onClick={(event) => buttonClick(event, index)}
											className="btn btn-outline-danger">
											Delete Post!
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PostFeed;
