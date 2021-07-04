import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../libs/contextLib";
import "./SpecificTraveler.css";
import { Link } from "react-router-dom";

const SpecificTraveler = (props) => {
	console.log(props.location.state);
	const { loggedInUser, totalUsers, parks } = useAppContext();
	console.log(props.location.state.users[props.location.state.index]);

	useEffect(() => {
		console.log("passing");
	}, []);

	return (
		<div>
			<NavBar tabActive="2" />
			<div className="top-info">
				<img
					className="icon-pic"
					src={props.location.state.users[props.location.state.index].icon}
				/>
				<h1 className="title ">
					{props.location.state.users[props.location.state.index].firstName +
						" " +
						props.location.state.users[props.location.state.index].lastName}
				</h1>
			</div>
			<div className="container wish-container">
				<h3>Wishlist Parks:</h3>
				<div className="row">
					{props.location.state.users[props.location.state.index].wishListParks
						.length > 0 ? (
						<div className="wrapper">
							{props.location.state.users[
								props.location.state.index
							].wishListParks.map((wish, index) => (
								<div key={index}>
									<div>
										<Link
											to={{
												pathname: "/specificPark",
												state: {
													parks: parks,
													name: wish.text,
												},
											}}>
											<p className="park-text">{wish.text}</p>
										</Link>
									</div>
								</div>
							))}
						</div>
					) : (
						<div>
							<p>This traveler doesn't have any parks on their wishlist.</p>
						</div>
					)}
				</div>
			</div>
			<div className="container visit-container">
				<h3>Visited Parks:</h3>
				<div className="row">
					{props.location.state.users[props.location.state.index].visitedParks
						.length > 0 ? (
						<div className="wrapper">
							{props.location.state.users[
								props.location.state.index
							].visitedParks.map((visited, index) => (
								<div key={index}>
									<div>
										<Link
											to={{
												pathname: "/specificPark",
												state: {
													parks: parks,
													name: visited.text,
												},
											}}>
											<p className="park-text">{visited.text}</p>
										</Link>
									</div>
								</div>
							))}
						</div>
					) : (
						<div>
							<p>This traveler has not been able to visit a park.</p>
						</div>
					)}
				</div>
			</div>
			<div className="container posts-container">
				<div className="row row-cols-1">
					<div className="col text-center">
						<h3 className="title-centered">Posts:</h3>
					</div>
				</div>
				<div className="row">
					{props.location.state.users[props.location.state.index].posts.length >
					0 ? (
						<div className="wrapper">
							{props.location.state.users[props.location.state.index].posts.map(
								(post, index) => (
									<div key={index}>
										<h7 className="park-title">{post.parkName}</h7>
										<p>Rating: {post.rating}/5</p>
										<p className="park-text">{post.text}</p>
									</div>
								)
							)}
						</div>
					) : (
						<div>
							<p>This traveler hasn't posted any reviews yet.</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SpecificTraveler;
