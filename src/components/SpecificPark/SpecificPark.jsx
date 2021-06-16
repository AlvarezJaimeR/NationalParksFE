import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../libs/contextLib";
import AddPost from "../AddPost/AddPost";
import PostFeed from "../PostFeed/PostFeed";
import "./SpecificPark.css";

const SpecificPark = (props) => {
	console.log(props.location.state);
	console.log(props.location.state.index);
	const { loggedInUser, isAuthenticated } = useAppContext();
	console.log(props.location.state.parks[props.location.state.index]);

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
					<AddPost />
				</div>
				<div>
					<PostFeed />
				</div>
			</div>
		</div>
	);
};

export default SpecificPark;
