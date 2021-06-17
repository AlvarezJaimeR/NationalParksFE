import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../libs/contextLib";
import AddPost from "../AddPost/AddPost";
import PostFeed from "../PostFeed/PostFeed";
import "./SpecificPark.css";
import axios from "axios";

const SpecificPark = (props) => {
	console.log(props.location.state);
	console.log(props.location.state.index);
	const { loggedInUser, headers } = useAppContext();
	console.log(props.location.state.parks[props.location.state.index]);
	const [update, setUpdate] = useState(true);

	useEffect(() => {}, [update]);

	const buttonClick = (event) => {
		console.log("button", event);

		switch (event.target.name) {
			case "wishlist":
				console.log("wishlist!");
				const park = {
					text: props.location.state.parks[props.location.state.index].fullName,
				};
				console.log(park);
				axios
					.put(
						`http://localhost:5000/api/users/${loggedInUser._id}/wishlist`,
						park,
						headers
					)
					.then((res) => {
						console.log(res);
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
					text: props.location.state.parks[props.location.state.index].fullName,
				};
				console.log(visitedPark);
				axios
					.put(
						`http://localhost:5000/api/users/${loggedInUser._id}/visited`,
						visitedPark,
						headers
					)
					.then((res) => {
						console.log(res);
						setUpdate(!update);
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

	return (
		<div>
			<div>
				<NavBar tabActive="1" />
				<h4 className="main">
					{props.location.state.parks[props.location.state.index].fullName}
				</h4>
				<img
					className="park-picture"
					alt={
						props.location.state.parks[props.location.state.index].images[0]
							.altText
					}
					src={
						props.location.state.parks[props.location.state.index].images[0].url
					}
				/>
				<div>
					{}
					<button
						name="wishlist"
						onClick={(event) => buttonClick(event)}
						className="btn btn-outline-dark">
						Add to Wishlist!
					</button>
					<button
						name="visited"
						onClick={(event) => buttonClick(event)}
						className="btn btn-outline-dark">
						Click here if you visited the park!
					</button>
				</div>
				<div className="main-body">
					<h5>Description:</h5>
					<p>
						{props.location.state.parks[props.location.state.index].description}
					</p>
					<h5>Website url: </h5>
					<a href={props.location.state.parks[props.location.state.index].url}>
						{props.location.state.parks[props.location.state.index].url}
					</a>
					<div>
						<h5>Directions info:</h5>
						<p>
							{
								props.location.state.parks[props.location.state.index]
									.directionsInfo
							}
						</p>
					</div>
					<div>
						<h5>
							{
								props.location.state.parks[props.location.state.index]
									.entranceFees[0].title
							}
						</h5>
						<p>
							$
							{
								props.location.state.parks[props.location.state.index]
									.entranceFees[0].cost
							}
						</p>
					</div>
					<div>
						<h5>Standard operation hours:</h5>
						<p>
							Sunday:
							{
								props.location.state.parks[props.location.state.index]
									.operatingHours[0].standardHours.sunday
							}
						</p>
						<p>
							Monday:
							{
								props.location.state.parks[props.location.state.index]
									.operatingHours[0].standardHours.monday
							}
						</p>
						<p>
							Tuesday:
							{
								props.location.state.parks[props.location.state.index]
									.operatingHours[0].standardHours.tuesday
							}
						</p>
						<p>
							Wednesday:
							{
								props.location.state.parks[props.location.state.index]
									.operatingHours[0].standardHours.wednesday
							}
						</p>
						<p>
							Thursday:
							{
								props.location.state.parks[props.location.state.index]
									.operatingHours[0].standardHours.thursday
							}
						</p>
						<p>
							Friday:
							{
								props.location.state.parks[props.location.state.index]
									.operatingHours[0].standardHours.friday
							}
						</p>
						<p>
							Saturday:
							{
								props.location.state.parks[props.location.state.index]
									.operatingHours[0].standardHours.saturday
							}
						</p>
					</div>
				</div>
				<div>
					<AddPost
						parkName={
							props.location.state.parks[props.location.state.index].fullName
						}
					/>
				</div>
				<div>
					<PostFeed />
				</div>
			</div>
		</div>
	);
};

export default SpecificPark;
