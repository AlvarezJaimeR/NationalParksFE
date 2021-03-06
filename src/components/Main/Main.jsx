import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../libs/contextLib";
import axios from "axios";
import "./Main.css";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import dateFormat from "dateformat";
import { ROOT_URL } from "../../apiRoot";

const Main = () => {
	const { loggedInUser, parks } = useAppContext();
	const [sort, setSort] = useState(false);
	const [specificUser, setSpecificUser] = useState();
	const [filteredWish, setFilteredWish] = useState([]);
	const [filterWishLogic, setFilterWishLogic] = useState(false);
	const [filterVisitLogic, setFilterVisitLogic] = useState(false);
	const [filteredVisit, setFilteredVisit] = useState([]);
	const [searchName, setSearchName] = useState("");

	const buttonClick = (event) => {
		switch (event.target.name) {
			case "sortAZ":
				parks.sort((a, b) => (a.name > b.name ? 1 : -1));
				setSort(!sort);
				break;
			case "sortZA":
				parks.sort((a, b) => (a.name > b.name ? 1 : -1)).reverse();
				setSort(!sort);
				break;
			case "state":
				parks.sort((a, b) => (a.states > b.states ? 1 : -1));
				setSort(!sort);
				break;
			case "filter all":
				setFilterWishLogic(false);
				setFilterVisitLogic(false);
				break;
			case "filter wishlist":
				setFilterWishLogic(true);
				setFilterVisitLogic(false);
				break;
			case "filter visited":
				setFilterWishLogic(false);
				setFilterVisitLogic(true);
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		getInfo();
	}, [parks]);

	function getInfo() {
		const filterWish = parks.filter((park) => {
			for (let i = 0; i < specificUser.wishListParks.length; i++) {
				if (park.fullName === specificUser.wishListParks[i].text) {
					return park;
				}
			}
		});
		setFilteredWish(filterWish);
		const filterVisit = parks.filter((park) => {
			for (let i = 0; i < specificUser.visitedParks.length; i++) {
				if (park.fullName === specificUser.visitedParks[i].text) {
					return park;
				}
			}
		});
		setFilteredVisit(filterVisit);
	}

	async function getUser() {
		await axios
			.get(`${ROOT_URL}api/users/${loggedInUser._id}`)
			.then((response) => {
				setSpecificUser(response.data);
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
				<div className="container">
					<div className="row all-cards">
						{filteredVisit
							.filter((park) => {
								if (searchName === "") {
									return park;
								} else if (
									park.fullName.toLowerCase().includes(searchName.toLowerCase())
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
			) : (
				<div>
					{filterWishLogic === true && filterVisitLogic === false ? (
						<div className="container">
							<div className="row all-cards">
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
							<div className="row all-cards">
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
			{specificUser.posts.length > 0 && filterWishLogic === false ? (
				<div className="container">
					<div className="row">
						<div className="col-5"></div>
						<h3 className="col-2 post-header">Your posts!</h3>
						<div className="col-5"></div>
					</div>
					<div className="row">
						{specificUser.posts.map((post, index) => (
							<div key={index} className="col-6 user-post">
								<h4>{post.parkName}</h4>
								<p>Ratings: {post.rating}/5</p>
								<h6>
									Posted on:{" "}
									{dateFormat(post.date, "mmmm dS, yyyy --- h:MM:ss TT")}
								</h6>
								<p>{post.text}</p>
							</div>
						))}
					</div>
				</div>
			) : specificUser.posts.length == 0 && filterWishLogic === false ? (
				<div>
					<h3 className="center-text">
						Currently no posts on any of the visited parks or there are
						currently no visited parks.
					</h3>
				</div>
			) : (
				<div></div>
			)}
		</div>
	) : (
		<div className="main">
			<ReactLoading type={"bars"} color={"black"} height={300} width={375} />
		</div>
	);
};

export default Main;
