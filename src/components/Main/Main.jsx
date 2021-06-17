import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../libs/contextLib";
import axios from "axios";
import "./Main.css";
import { Link } from "react-router-dom";
import SearchPark from "../SearchPark/SearchPark";

const Main = () => {
	const { loggedInUser, setLoggedInUser, isAuthenticated, parks, setParks } =
		useAppContext();
	const [sort, setSort] = useState(false);

	const buttonClick = (event) => {
		switch (event.target.name) {
			case "sortAZ":
				console.log("parks AZ", parks);
				parks.sort((a, b) => (a.name > b.name ? 1 : -1));
				console.log(parks);
				setSort(!sort);
				break;
			case "sortZA":
				console.log("parks ZA", parks);
				parks.sort((a, b) => (a.name > b.name ? 1 : -1)).reverse();
				setSort(!sort);
				break;
			case "state":
				console.log("state", parks);
				parks.sort((a, b) => (a.states > b.states ? 1 : -1));
				console.log(parks);
				setSort(!sort);
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		console.log("passing");
	}, [parks]);

	return parks.length > 0 ? (
		<div>
			<NavBar tabActive="1" />
			<h1 className="main">National Parks!</h1>
			<div>
				<SearchPark />
			</div>
			<div className="container">
				<button>Filter by wishlist</button>
				<button>Filter by visited parks</button>
				<button onClick={(event) => buttonClick(event)} name="sortAZ">
					Sort A-Z
				</button>
				<button onClick={(event) => buttonClick(event)} name="sortZA">
					Sort Z-A
				</button>
				<button onClick={(event) => buttonClick(event)} name="state">
					Sort By State
				</button>
			</div>
			<div className="container">
				<div className="row">
					{parks.map((park, index) => (
						<div key={index} className="card" style={{ width: "11em" }}>
							<Link
								to={{
									pathname: "/specificPark",
									state: { parks: parks, index: index },
								}}>
								{/* 								<img
									className="park-picture"
									alt={park.images[0].altText}
									src={park.images[0].url}
								/> */}
								<p>{park.name + ", " + park.states}</p>
							</Link>
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
