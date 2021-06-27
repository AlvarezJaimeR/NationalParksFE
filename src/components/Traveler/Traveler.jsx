import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import "./Traveler.css";
import { useAppContext } from "../../libs/contextLib";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

const Travelers = () => {
	const { totalUsers, setTotalUsers, loggedInUser } = useAppContext();
	console.log("all users", totalUsers);
	console.log("logged in user", loggedInUser);
	const [otherUsers, setOtherUsers] = useState([]);

	useEffect(() => {
		filterUser();
	}, []);

	function filterUser() {
		const tempUser = totalUsers.filter((user) => user._id != loggedInUser._id);
		console.log(tempUser);
		setOtherUsers(tempUser);
	}

	return otherUsers.length > 0 ? (
		<div>
			<NavBar tabActive="2" />
			<h1 className="main">Travelers</h1>
			<div className="container">
				<div className="row">
					{otherUsers.map((user, index) => (
						<div key={index} className="image-icon" style={{ width: "11em" }}>
							<p>
								<small>{"Wishlist Parks: " + user.wishListParks.length}</small>
							</p>
							<p>
								<small>{"Visited Parks: " + user.visitedParks.length}</small>
							</p>
							<Link
								to={{
									pathname: "/specificTraveler",
									state: { users: otherUsers, index: index },
								}}>
								<img src={user.icon} />
							</Link>
							<h4>{user.firstName + " " + user.lastName}</h4>
						</div>
					))}
				</div>
			</div>
		</div>
	) : (
		<div className="main">
			<ReactLoading type={"bars"} color={"black"} height={667} width={375} />
		</div>
	);
};

export default Travelers;
