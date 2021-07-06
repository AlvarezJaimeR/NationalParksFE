import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../libs/contextLib";
import axios from "axios";
import "./Main.css";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

const Main = () => {
	const { loggedInUser, parks, totalUsers } = useAppContext();
	const [sort, setSort] = useState(false);
	const [specificUser, setSpecificUser] = useState();
	const [filteredWish, setFilteredWish] = useState();
	const [filterWishLogic, setFilterWishLogic] = useState(false);
	const [filterVisitLogic, setFilterVisitLogic] = useState(false);
	const [filteredVisit, setFilteredVisit] = useState(false);
	const [searchName, setSearchName] = useState("");

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
			case "filter all":
				console.log("filter all");
				setFilterWishLogic(false);
				setFilterVisitLogic(false);
				break;
			case "filter wishlist":
				console.log("filter wishlist");
				setFilterWishLogic(true);
				setFilterVisitLogic(false);
				break;
			case "filter visited":
				console.log("filter visted");
				setFilterWishLogic(false);
				setFilterVisitLogic(true);
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		console.log("passing");
		getUser();
	}, [parks]);

	async function getUser() {
		console.log(loggedInUser);
		await axios
			.get(`http://localhost:5000/api/users/${loggedInUser._id}`)
			.then((response) => {
				console.log("specific user", response.data);
				setSpecificUser(response.data);
				console.log(response.data.wishListParks);
				console.log(response.data.visitedParks);
			})
			.then(() => {
				const filterWish = parks.filter((park) => {
					for (let i = 0; i < specificUser.wishListParks.length; i++) {
						if (park.fullName === specificUser.wishListParks[i].text) {
							return park;
						}
					}
				});
				console.log(filterWish);
				setFilteredWish(filterWish);
				const filterVisit = parks.filter((park) => {
					for (let i = 0; i < specificUser.visitedParks.length; i++) {
						if (park.fullName === specificUser.visitedParks[i].text) {
							return park;
						}
					}
				});
				console.log(filterVisit);
				setFilteredVisit(filterVisit);
			});
	}

	return parks.length > 0 ? (
		<div>
			<NavBar tabActive="1" />
			<h1 className="main">National Parks</h1>
			<div className="search-bar">
				<input
					className="input-field"
					type="text"
					placeholder="Search by name... (Arches)"
					onChange={(event) => {
						setSearchName(event.target.value);
					}}
				/>
			</div>
			<div className="container button-list">
				<button
					data-bs-toggle="dropdown"
					aria-expanded="false"
					id="btnGroupDrop1"
					className="btn-list btn-outline-secondary">
					Filter Parks
				</button>
				<ul className="dropdown-menu">
					<button
						className="btn-secondary"
						onClick={(event) => buttonClick(event)}
						name="filter all">
						Filter by all
					</button>
					<button
						className="btn-secondary"
						onClick={(event) => buttonClick(event)}
						name="filter wishlist">
						Filter by wishlist
					</button>
					<button
						className="btn-secondary"
						onClick={(event) => buttonClick(event)}
						name="filter visited">
						Filter by visited parks
					</button>
				</ul>
				<button
					data-bs-toggle="dropdown"
					aria-expanded="false"
					className="btn-list btn-outline-secondary"
					id="btnGroupDrop2">
					Sort Parks
				</button>
				<ul className="dropdown-menu">
					<button
						className="btn-secondary"
						onClick={(event) => buttonClick(event)}
						name="sortAZ">
						Sort A-Z
					</button>
					<button
						className="btn-secondary"
						onClick={(event) => buttonClick(event)}
						name="sortZA">
						Sort Z-A
					</button>
					<button
						className="btn-secondary"
						onClick={(event) => buttonClick(event)}
						name="state">
						Sort By State
					</button>
				</ul>
			</div>
			{filterVisitLogic === true ? (
				<div>
					<div className="container">
						<div className="row">
							{filteredVisit
								.filter((park) => {
									if (searchName === "") {
										return park;
									} else if (
										park.fullName
											.toLowerCase()
											.includes(searchName.toLowerCase())
									) {
										return park;
									}
								})
								.map((park, index) => (
									<div
										key={index}
										className="card-all visit"
										style={{ height: "13em", width: "11em" }}>
										<Link
											to={{
												pathname: "/specificPark",
												state: {
													parks: parks,
													name: park.fullName,
												},
											}}>
											<img
												className="park-visit-picture"
												alt={park.images[0].altText}
												src={park.images[0].url}
											/>
											<p>{park.name + ", " + park.states}</p>
										</Link>
									</div>
								))}
						</div>
					</div>
				</div>
			) : (
				<div>
					{filterWishLogic === true && filterVisitLogic === false ? (
						<div className="container">
							<div className="row">
								{filteredWish
									.filter((park) => {
										if (searchName === "") {
											return park;
										} else if (
											park.fullName
												.toLowerCase()
												.includes(searchName.toLowerCase())
										) {
											return park;
										}
									})
									.map((park, index) => (
										<div
											key={index}
											className="card-all wish"
											style={{ height: "13em", width: "11em" }}>
											<Link
												to={{
													pathname: "/specificPark",
													state: {
														parks: parks,
														name: park.fullName,
													},
												}}>
												<p className="park-state-wish">
													{park.name + ", " + park.states}
												</p>
											</Link>
											<div>
												<img
													src={
														process.env.PUBLIC_URL + `images/Star.png`
													}></img>
											</div>
										</div>
									))}
							</div>
						</div>
					) : (
						<div className="container">
							<div className="row">
								{parks
									.filter((park) => {
										if (searchName === "") {
											return park;
										} else if (
											park.fullName
												.toLowerCase()
												.includes(searchName.toLowerCase())
										) {
											return park;
										}
									})
									.map((park, index) => {
										for (let i = 0; i < filteredWish.length; i++) {
											if (
												filteredWish[i].fullName.includes(park.fullName) ===
												true
											)
												return (
													<div
														key={index}
														className="card-all wish"
														style={{ height: "13em", width: "11em" }}>
														<Link
															to={{
																pathname: "/specificPark",
																state: {
																	parks: parks,
																	name: park.fullName,
																},
															}}>
															<p className="park-state-wish">
																{park.name + ", " + park.states}
															</p>
														</Link>
														<div>
															<img
																src={
																	process.env.PUBLIC_URL + `images/Star.png`
																}></img>
														</div>
													</div>
												);
										}
										for (let j = 0; j < filteredVisit.length; j++) {
											if (
												filteredVisit[j].fullName.includes(park.fullName) ===
												true
											) {
												return (
													<div
														key={index}
														className="card-all visit"
														style={{ height: "13em", width: "11em" }}>
														<Link
															to={{
																pathname: "/specificPark",
																state: {
																	parks: parks,
																	name: park.fullName,
																},
															}}>
															<img
																className="park-visit-picture"
																alt={park.images[0].altText}
																src={park.images[0].url}
															/>
															<p className="park-state-visit">
																{park.name + ", " + park.states}
															</p>
														</Link>
													</div>
												);
											}
										}
										return (
											<div
												key={index}
												className="card-all all"
												style={{ height: "13em", width: "11em" }}>
												<Link
													to={{
														pathname: "/specificPark",
														state: {
															parks: parks,
															name: park.fullName,
														},
													}}>
													<p className="park-state">
														{park.name + ", " + park.states}
													</p>
												</Link>
											</div>
										);
									})}
							</div>
						</div>
					)}
				</div>
			)}
			{specificUser.posts.length > 0 ? (
				<div className="container">
					<div className="row">Posts!</div>
					{specificUser.posts.map((post, index) => (
						<div key={index} className="row">
							<h4>{post.parkName}</h4>
							<p>{post.rating}/5</p>
							<p>{post.text}</p>
						</div>
					))}
				</div>
			) : (
				<div>
					<h3>Currently no posts on any of the visited parks.</h3>
				</div>
			)}
		</div>
	) : (
		<div className="main">
			<ReactLoading type={"bars"} color={"black"} height={300} width={375} />
		</div>
	);
};

export default Main;
