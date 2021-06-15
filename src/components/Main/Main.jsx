import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../libs/contextLib";
import axios from "axios";
import "./Main.css";
import SpecificPark from "../SpecificPark/SpecificPark";

const Main = () => {
	const { loggedInUser, setLoggedInUser, isAuthenticated, parks, setParks } =
		useAppContext();

	return parks.length > 0 ? (
		<div>
			<NavBar tabActive="1" />
			<h1 className="main">National Parks!</h1>
			<div className="container">
				<div className="row">
					{parks.map((park, index) => (
						<div key={index} className="card" style={{ width: "11em" }}>
							<a href="/specificPark" className="card-body">
								{park.name}
							</a>
						</div>
					))}
				</div>
			</div>
		</div>
	) : (
		<div className="main">
			<h1>National Parks Loading...</h1>
		</div>
	);
};

export default Main;
