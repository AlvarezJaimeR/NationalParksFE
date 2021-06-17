import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../libs/contextLib";
import "./SpecificTraveler.css";

const SpecificTraveler = (props) => {
	console.log(props.location.state);
	const { loggedInUser, totalUsers, parks } = useAppContext();
	console.log(props.location.state.users[props.location.state.index]);

	return (
		<div>
			<NavBar tabActive="2" />
			<div>
				<h4 className=" main">
					{props.location.state.users[props.location.state.index].firstName +
						" " +
						props.location.state.users[props.location.state.index].lastName}
				</h4>
				<img
					className="icon-pic"
					src={props.location.state.users[props.location.state.index].icon}
				/>
			</div>
			{props.location.state.users[props.location.state.index].wishListParks
				.length > 0 ? (
				<div>
					<div className="user-parks">Parks Wishlist:</div>
					<div>
						{props.location.state.users[
							props.location.state.index
						].wishListParks.map((wish, index) => (
							<div key={index}>
								<div className="row row-cols-2">
									<div className="col-8 text-center">
										<p>{wish.text}</p>
										{console.log(wish.text)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<p>This user currently doesn't have any parks on their wishlist.</p>
			)}
			{props.location.state.users[props.location.state.index].visitedParks
				.length > 0 ? (
				<div>
					<div className="user-parks">Visited Parks:</div>
					<div>
						{props.location.state.users[
							props.location.state.index
						].visitedParks.map((visited, index) => (
							<div key={index}>
								<div className="row row-cols-2">
									<div className="col-8 text-center">
										<p>{visited.text}</p>
										{console.log(visited.text)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<p>This user has not been able to visit a park.</p>
			)}
		</div>
	);
};

export default SpecificTraveler;
