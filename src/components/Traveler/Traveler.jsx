import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import "./Traveler.css";
import { useAppContext } from "../../libs/contextLib";

const Travelers = () => {
	const { totalUsers, setTotalUsers } = useAppContext();

	return (
		<div>
			<NavBar tabActive="1" />
			<h1 className="main">Travelers!</h1>
			<div className="container">
				<div className="row">
					{totalUsers.map((user, index) => (
						<div key={index} className="card" style={{ width: "11em" }}>
							<p>{user.firstName + " " + user.lastName}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Travelers;
