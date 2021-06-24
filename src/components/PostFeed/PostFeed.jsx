import React, { useEffect, useState } from "react";
import "./PostFeed.css";
import { useAppContext } from "../../libs/contextLib";
import axios from "axios";
import EditPost from "../EditPost/EditPost";
import dateFormat from "dateformat";

const PostFeed = (props) => {
	const { loggedInUser, headers } = useAppContext();
	const [posts, setPosts] = useState([]);
	const [update, setUpdate] = useState(false);
	const [openModal, setOpenModal] = useState(true);
	//console.log("post feed props", props);

	const buttonClick = (event, post) => {
		console.log("button", event);
		console.log("button", post);
		console.log("button", posts);

		switch (event.target.name) {
			case "edit":
				console.log("edit");
				setOpenModal(true);
				setUpdate(!update);
				break;
			case "delete":
				axios
					.put(
						`http://localhost:5000/api/posts/${loggedInUser._id}/delete/${posts[post]._id}`,
						posts,
						headers
					)
					.then((res) => {
						//console.log(res);
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
				//console.log(response.data);
				const filteredPosts = response.data.filter(
					(post) => post.parkName === props.parkName
				);
				//console.log(filteredPosts);
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
										<button
											className="btn btn-outline-secondary"
											data-bs-toggle="modal"
											data-bs-target="#staticBackdrop"
											onClick={(event) => buttonClick(event, index)}
											name="edit">
											Edit Post!
										</button>
										{openModal === true ? (
											<EditPost
												open={openModal}
												body={post.text}
												index={index}
											/>
										) : (
											<div></div>
										)}
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
