import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../libs/contextLib";
import AddPost from "../AddPost/AddPost";
import PostFeed from "../PostFeed/PostFeed";
import "./SpecificPark.css";
import axios from "axios";

const SpecificPark = (props) => {
	//console.log(props.location.state);
	//console.log(props.location.state.index);
	const { loggedInUser, headers, setLoggedInUser } = useAppContext();
	//console.log(props.location.state.parks[props.location.state.index]);
	const [update, setUpdate] = useState(true);
	const [wishlist, setWishlist] = useState(false);
	const [visitlist, setVisitlist] = useState(false);
	const [specificUser, setSpecificUser] = useState();
	const [currentPark, setCurrentPark] = useState([]);
	const [weather, setWeather] = useState({});
	const [finished, setFinished] = useState(false);

	useEffect(
		() => {
			console.log("passing");
			getWeather();
			getUser();
		},
		[],
		[update],
		[wishlist],
		[visitlist]
	);

	async function getWeather() {
		const tempPark = props.location.state.parks.filter(
			(park) => park.fullName === props.location.state.name
		);
		console.log("filtered park", tempPark);
		setCurrentPark(tempPark);
		console.log(tempPark[0].latitude);
		console.log(tempPark[0].longitude);
		setFinished(true);
		/* 		axios
			.get(
				`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WTHR_API_KEY}&query=${tempPark[0].latitude},${tempPark[0].longitude}&units=f`
			)
			.then((response) => {
				setWeather(response.data);
				setFinished(true);
			})
			.catch((error) => {
				console.log(error);
				alert(error.response.data);
			}); */
	}

	async function getUser() {
		console.log(loggedInUser);
		await axios
			.get(`http://localhost:5000/api/users/${loggedInUser._id}`)
			.then((response) => {
				console.log("specific user", response.data);
				setSpecificUser(response.data);
				console.log(response.data.wishListParks);
				console.log(response.data.visitedParks);
				const removedWish = response.data.wishListParks.filter(
					(park) => park.text === props.location.state.name
				);
				console.log(removedWish);
				const removedVisit = response.data.visitedParks.filter(
					(parkV) => parkV.text === props.location.state.name
				);
				console.log(removedVisit);
				if (removedWish.length > 0) {
					setWishlist(true);
				} else setWishlist(false);
				if (removedVisit.length > 0) {
					setVisitlist(true);
				} else setVisitlist(false);
			});
	}

	const buttonClick = (event) => {
		console.log("button", event.target.name);
		switch (event.target.name) {
			case "wishlist":
				console.log("wishlist!");
				const wishlistPark = {
					text: props.location.state.name,
				};
				console.log(wishlistPark);
				axios
					.put(
						`http://localhost:5000/api/users/${loggedInUser._id}/wishlist`,
						wishlistPark,
						headers
					)
					.then((res) => {
						console.log(res);
						setSpecificUser(res.data);
						setWishlist(true);
						setUpdate(!update);
					})
					.catch((err) => {
						console.log(err);
						console.log(err.response.data);
					});
				break;
			case "visited":
				console.log("visited!");
				const visitedPark = {
					text: props.location.state.name,
				};
				console.log(visitedPark);
				axios
					.put(
						`http://localhost:5000/api/users/${loggedInUser._id}/visited/${visitedPark.text}`,
						visitedPark,
						headers
					)
					.then((res) => {
						console.log(res);
						setSpecificUser(res.data);
						setVisitlist(true);
						setUpdate(!update);
					})
					.catch((err) => {
						console.log(err);
						console.log(err.response.data);
					});
				break;
			case "wishlist remove":
				console.log("remove wishlist!");
				const wish = specificUser.wishListParks.filter(
					(park) => park.text === props.location.state.name
				);
				console.log(wish);
				axios
					.put(
						`http://localhost:5000/api/users/${loggedInUser._id}/${wish[0].text}`,
						wish,
						headers
					)
					.then((res) => {
						console.log(res);
						setWishlist(false);
						setUpdate(!update);
					})
					.catch((err) => {
						console.log(err);
						console.log(err.response.data);
					});
				break;
			case "visited remove":
				console.log("remove visited list");
				console.log(specificUser);
				const visit = specificUser.visitedParks.filter(
					(park) => park.text === props.location.state.name
				);
				console.log(visit);
				axios
					.put(
						`http://localhost:5000/api/users/${loggedInUser._id}/${visit[0].text}/visit`,
						visit,
						headers
					)
					.then((res) => {
						console.log(res);
						setSpecificUser(res.data);
						setVisitlist(false);
						setUpdate(!update);
						setWishlist(false);
					})
					.catch((err) => {
						console.log(err);
						console.log(err.response.data);
					});
				break;
			default:
				break;
		}
	};

	return finished === true ? (
		<div>
			<div>
				<NavBar tabActive="1" />
				<h4 className="main">{props.location.state.name}</h4>
				<img
					className="park-picture"
					alt={currentPark[0].images[0].altText}
					src={currentPark[0].images[0].url}
				/>
				{visitlist === false ? (
					<div>
						{wishlist === false ? (
							<div>
								<button
									name="wishlist"
									onClick={(event) => buttonClick(event)}
									className="btn btn-outline-dark">
									Add to Wishlist!
								</button>
							</div>
						) : (
							<div>
								<button
									name="wishlist remove"
									onClick={(event) => buttonClick(event)}
									className="btn btn-outline-dark">
									Remove from wish list!
								</button>
							</div>
						)}
						<div>
							<button
								name="visited"
								onClick={(event) => buttonClick(event)}
								className="btn btn-outline-dark">
								Click here if you visited the park!
							</button>
						</div>
					</div>
				) : (
					<div>
						<button
							name="visited remove"
							onClick={(event) => buttonClick(event)}
							className="btn btn-outline-dark">
							Remove from visited list!
						</button>
					</div>
				)}

				<div className="main-body">
					<h5>Description:</h5>
					<p>{currentPark[0].description}</p>
					<h5>Website url: </h5>
					<a href={currentPark[0].url}>{currentPark[0].url}</a>
					<div>
						<h5>Directions info:</h5>
						<p>{currentPark[0].directionsInfo}</p>
					</div>
					<div>
						<h5>{currentPark[0].entranceFees[0].title}</h5>
						<p>${currentPark[0].entranceFees[0].cost}</p>
					</div>
					<div>
						<h5>Standard operation hours:</h5>
						<p>
							Sunday:
							{currentPark[0].operatingHours[0].standardHours.sunday}
						</p>
						<p>
							Monday:
							{currentPark[0].operatingHours[0].standardHours.monday}
						</p>
						<p>
							Tuesday:
							{currentPark[0].operatingHours[0].standardHours.tuesday}
						</p>
						<p>
							Wednesday:
							{currentPark[0].operatingHours[0].standardHours.wednesday}
						</p>
						<p>
							Thursday:
							{currentPark[0].operatingHours[0].standardHours.thursday}
						</p>
						<p>
							Friday:
							{currentPark[0].operatingHours[0].standardHours.friday}
						</p>
						<p>
							Saturday:
							{currentPark[0].operatingHours[0].standardHours.saturday}
						</p>
					</div>
					{/* 					<div>
						<h5>Current weather:</h5>
						<p>{weather.location.localtime}</p>
						<p>{weather.current.temperature}</p>
						<img
							src={weather.current.weather_icons}
							alt={weather.current.weather_descriptions}
						/>
						<p>{weather.current.weather_descriptions}</p>
					</div> */}
				</div>
				<div>
					{visitlist === true ? (
						<div>
							<div>
								<AddPost parkName={props.location.state.name} />
							</div>
							<div>
								<PostFeed parkName={props.location.state.name} />
							</div>
						</div>
					) : (
						<div></div>
					)}
				</div>
			</div>
		</div>
	) : (
		<div>
			<h1>Loading...</h1>
		</div>
	);
};

export default SpecificPark;
