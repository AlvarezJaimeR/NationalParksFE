import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";
import ReactLoading from "react-loading";

const Home = () => {
	const [parks, setParks] = useState([]);
	const { isAuthenticated } = useAppContext();

	useEffect(() => {
		console.log("passing");
		getParks();
	}, []);

	async function getParks() {
		await axios
			.get(
				`https://developer.nps.gov/api/v1/parks?limit=500&api_key=${process.env.REACT_APP_NPS_API_KEY}`
			)
			.then((response) => {
				console.log(response.data.data);
				const tempParks = response.data.data.filter(
					(parks) =>
						parks.parkCode === "glac" ||
						parks.parkCode === "whsa" ||
						parks.parkCode === "kefj" ||
						parks.parkCode === "acad" ||
						parks.parkCode === "brca"
				);
				setParks(tempParks);
				console.log(tempParks);
			})
			.catch((error) => {
				console.log(error);
				alert(error.response.data);
			});
	}
	return (
		<div>
			{parks.length > 0 ? (
				<div>
					<div className="container">
						<NavBar tabActive="0" />
					</div>
					<div className="home container">
						<div className="col">
							<h4 className="text-center">National parks to visit!</h4>
						</div>
					</div>
					{isAuthenticated === true ? (
						<div className="container">
							<div className="row">
								<div className="col-sm-2"></div>
								<div className="col-sm-8 ">
									<div
										id="carouselExampleCaptions"
										className="carousel slide carousel-fade"
										data-bs-ride="carousel fade">
										<div className="carousel-indicators">
											<button
												type="button"
												data-bs-target="#carouselExampleCaptions"
												data-bs-slide-to="0"
												className="active"
												aria-current="true"
												aria-label="Slide 1"></button>
											<button
												type="button"
												data-bs-target="#carouselExampleCaptions"
												data-bs-slide-to="1"
												aria-label="Slide 2"></button>
											<button
												type="button"
												data-bs-target="#carouselExampleCaptions"
												data-bs-slide-to="2"
												aria-label="Slide 3"></button>
											<button
												type="button"
												data-bs-target="#carouselExampleCaptions"
												data-bs-slide-to="3"
												aria-label="Slide 4"></button>
											<button
												type="button"
												data-bs-target="#carouselExampleCaptions"
												data-bs-slide-to="4"
												aria-label="Slide 5"></button>
										</div>
										<div className="carousel-inner">
											<div className="carousel-item active">
												<Link
													to={{
														pathname: "/specificPark",
														state: {
															parks: parks,
															name: parks[0].fullName,
														},
													}}>
													<img
														src={parks[0].images[0].url}
														className="w-100 carousel-image"
														alt={parks[0].images[0].altText}
													/>
												</Link>
												<div className="carousel-caption ">
													<h6>
														{parks[0].fullName} {" , "} {parks[0].states}
													</h6>
												</div>
											</div>
											<div className="carousel-item">
												<Link
													to={{
														pathname: "/specificPark",
														state: {
															parks: parks,
															name: parks[1].fullName,
														},
													}}>
													<img
														src={parks[1].images[0].url}
														className="w-100 carousel-image"
														alt={parks[1].images[0].altText}
													/>
												</Link>
												<div className="carousel-caption ">
													<h6>
														{parks[1].fullName} {" , "} {parks[1].states}
													</h6>
												</div>
											</div>
											<div className="carousel-item">
												<Link
													to={{
														pathname: "/specificPark",
														state: {
															parks: parks,
															name: parks[2].fullName,
														},
													}}>
													<img
														src={parks[2].images[4].url}
														className="w-100 carousel-image"
														alt={parks[2].images[4].altText}
													/>
												</Link>
												<div className="carousel-caption d">
													<h6>
														{parks[2].fullName} {" , "} {parks[2].states}
													</h6>
												</div>
											</div>
											<div className="carousel-item">
												<Link
													to={{
														pathname: "/specificPark",
														state: {
															parks: parks,
															name: parks[3].fullName,
														},
													}}>
													<img
														src={parks[3].images[3].url}
														className="w-100 carousel-image"
														alt={parks[3].images[3].altText}
													/>
												</Link>
												<div className="carousel-caption d">
													<h6>
														{parks[3].fullName} {" , "} {parks[3].states}
													</h6>
												</div>
											</div>
											<div className="carousel-item">
												<Link
													to={{
														pathname: "/specificPark",
														state: {
															parks: parks,
															name: parks[4].fullName,
														},
													}}>
													<img
														src={parks[4].images[0].url}
														className="w-100 carousel-image"
														alt={parks[4].images[0].altText}
													/>
												</Link>
												<div className="carousel-caption d">
													<h6>
														{parks[4].fullName} {" , "} {parks[4].states}
													</h6>
												</div>
											</div>
										</div>
										<button
											className="carousel-control-prev"
											type="button"
											data-bs-target="#carouselExampleCaptions"
											data-bs-slide="prev">
											<span
												className="carousel-control-prev-icon"
												aria-hidden="true"></span>
											<span className="visually-hidden">Previous</span>
										</button>
										<button
											className="carousel-control-next"
											type="button"
											data-bs-target="#carouselExampleCaptions"
											data-bs-slide="next">
											<span className="carousel-control-next-icon"></span>
											<span className="visually-hidden">Next</span>
										</button>
									</div>
								</div>
								<div className="col-sm-2"></div>
							</div>
						</div>
					) : (
						<div className="container">
							<div className="row">
								<div className="col-sm-2"></div>
								<div className="col-sm-8 ">
									<div
										id="carouselExampleCaptions"
										className="carousel slide carousel-fade"
										data-bs-ride="carousel fade">
										<div className="carousel-indicators">
											<button
												type="button"
												data-bs-target="#carouselExampleCaptions"
												data-bs-slide-to="0"
												className="active"
												aria-current="true"
												aria-label="Slide 1"></button>
											<button
												type="button"
												data-bs-target="#carouselExampleCaptions"
												data-bs-slide-to="1"
												aria-label="Slide 2"></button>
											<button
												type="button"
												data-bs-target="#carouselExampleCaptions"
												data-bs-slide-to="2"
												aria-label="Slide 3"></button>
											<button
												type="button"
												data-bs-target="#carouselExampleCaptions"
												data-bs-slide-to="3"
												aria-label="Slide 4"></button>
											<button
												type="button"
												data-bs-target="#carouselExampleCaptions"
												data-bs-slide-to="4"
												aria-label="Slide 5"></button>
										</div>
										<div className="carousel-inner">
											<div className="carousel-item active">
												<a href={parks[0].url}>
													<img
														src={parks[0].images[0].url}
														className="w-100 carousel-image"
														alt={parks[0].images[0].altText}
													/>
												</a>
												<div className="carousel-caption ">
													<h6>
														{parks[0].fullName} {" , "} {parks[0].states}
													</h6>
												</div>
											</div>
											<div className="carousel-item">
												<a href={parks[1].url}>
													<img
														src={parks[1].images[0].url}
														className="w-100 carousel-image"
														alt={parks[1].images[0].altText}
													/>
												</a>
												<div className="carousel-caption ">
													<h6>
														{parks[1].fullName} {" , "} {parks[1].states}
													</h6>
												</div>
											</div>
											<div className="carousel-item">
												<a href={parks[2].url}>
													<img
														src={parks[2].images[4].url}
														className="w-100 carousel-image"
														alt={parks[2].images[4].altText}
													/>
												</a>
												<div className="carousel-caption d">
													<h6>
														{parks[2].fullName} {" , "} {parks[2].states}
													</h6>
												</div>
											</div>
											<div className="carousel-item">
												<a href={parks[3].url}>
													<img
														src={parks[3].images[3].url}
														className="w-100 carousel-image"
														alt={parks[3].images[3].altText}
													/>
												</a>
												<div className="carousel-caption d">
													<h6>
														{parks[3].fullName} {" , "} {parks[3].states}
													</h6>
												</div>
											</div>
											<div className="carousel-item">
												<a href={parks[4].url}>
													<img
														src={parks[4].images[0].url}
														className="w-100 carousel-image"
														alt={parks[4].images[0].altText}
													/>
												</a>
												<div className="carousel-caption d">
													<h6>
														{parks[4].fullName} {" , "} {parks[4].states}
													</h6>
												</div>
											</div>
										</div>
										<button
											className="carousel-control-prev"
											type="button"
											data-bs-target="#carouselExampleCaptions"
											data-bs-slide="prev">
											<span
												className="carousel-control-prev-icon"
												aria-hidden="true"></span>
											<span className="visually-hidden">Previous</span>
										</button>
										<button
											className="carousel-control-next"
											type="button"
											data-bs-target="#carouselExampleCaptions"
											data-bs-slide="next">
											<span className="carousel-control-next-icon"></span>
											<span className="visually-hidden">Next</span>
										</button>
									</div>
								</div>
								<div className="col-sm-2"></div>
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="main">
					<ReactLoading
						type={"bars"}
						color={"black"}
						height={667}
						width={375}
					/>
				</div>
			)}
		</div>
	);
};

export default Home;
