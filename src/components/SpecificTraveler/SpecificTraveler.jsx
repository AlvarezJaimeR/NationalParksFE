import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../libs/contextLib";
import "./SpecificTraveler.css";
import { Link } from "react-router-dom";

const SpecificTraveler = (props) => {
	console.log(props.location.state);
	const { loggedInUser, totalUsers, parks } = useAppContext();
	console.log(props.location.state.users[props.location.state.index]);
	const [filteredVisit, setFilteredVisit] = useState([]);
	const [wishedVisit, setWishedVisit] = useState([]);

	useEffect(() => {
		console.log("passing");
		const filterVisit = parks.filter((park) => {
			for (
				let i = 0;
				i <
				props.location.state.users[props.location.state.index].visitedParks
					.length;
				i++
			) {
				if (
					park.fullName ===
					props.location.state.users[props.location.state.index].visitedParks[i]
						.text
				) {
					return park;
				}
			}
		});
		setFilteredVisit(filterVisit);
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
											<p>{wish.text}</p>
											{console.log(wish.text)}
										</Link>
									</div>
								</div>
							))}
						</div>
					) : (
						<div>
							<p>Wishlist Parks:</p>
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
							<div>
								{props.location.state.users[
									props.location.state.index
								].visitedParks.map((visited, index) => (
									<div key={index}>
										<div>
											<div>
												<Link
													to={{
														pathname: "/specificPark",
														state: {
															parks: parks,
															name: visited.text,
														},
													}}>
													<p>{visited.text}</p>
													{console.log(visited.text)}
												</Link>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					) : (
						<div>
							<p>Visited Parks:</p>
							<p>This traveler has not been able to visit a park.</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SpecificTraveler;
