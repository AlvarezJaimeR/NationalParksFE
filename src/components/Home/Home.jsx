import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
	const [parks, setParks] = useState([]);

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
						parks.parkCode === "npsa" ||
						parks.parkCode === "neri" ||
						parks.parkCode === "redw"
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
					<NavBar tabActive="0" />
					<h1 className="home">Hello Home!</h1>
					<div className="row row-cols-1">
						<div className="col">
							<h4 className="text-center">Reasons to be here</h4>
						</div>
					</div>
					<div className="row ">
						<div className="col w-100 ">
							<div
								id="carouselExampleCaptions"
								className="carousel slide"
								data-bs-ride="carousel">
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
								</div>
								<div className="carousel-inner">
									<div className="carousel-item active">
										<img
											src={parks[0].images[0].url}
											className="d-block w-100 h500 carousel-image"
											alt="test"
										/>
										<div className="carousel-caption d-none d-md-block">
											<h5>DISCOVER</h5>
											<p>Find something new!</p>
										</div>
									</div>
									<div className="carousel-item">
										<img
											src={parks[1].images[0].url}
											className="d-block w-100 carousel-image"
											alt="temp"
										/>
										<div className="carousel-caption d-none d-md-block">
											<h5>RECOGNIZE</h5>
											<p>Music is the source of life.</p>
										</div>
									</div>
									<div className="carousel-item">
										<img
											src={parks[2].images[0].url}
											className="d-block w-100 h500 carousel-image"
											alt="alt"
										/>
										<div className="carousel-caption d-none d-md-block">
											<h5>ENJOY</h5>
											<p>Have fun making friends and finding new music.</p>
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
									<span
										className="carousel-control-next-icon"
										aria-hidden="true"></span>
									<span className="visually-hidden">Next</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<p>Welcome to the national park home page!</p>
			)}
		</div>
	);
};

export default Home;
