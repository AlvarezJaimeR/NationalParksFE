import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import "./Traveler.css";
import { useAppContext } from "../../libs/contextLib";
import { Link } from "react-router-dom";

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
			<h1 className="main">Travelers!</h1>
			<div className="container">
				<div className="row">
					{otherUsers.map((user, index) => (
						<div key={index} className="card" style={{ width: "11em" }}>
							<Link
								to={{
									pathname: "/specificTraveler",
									state: { users: otherUsers, index: index },
								}}>
								<p>{user.firstName + " " + user.lastName}</p>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	) : (
		<h1>loading...</h1>
	);
};

export default Travelers;
