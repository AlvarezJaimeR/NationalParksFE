import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../libs/contextLib";
import "./SpecificPark.css";

const SpecificPark = (props) => {
	console.log(props.location.state);
	console.log(props.location.state.index);
	const { loggedInUser, isAuthenticated, parks } = useAppContext();
	console.log(parks[props.location.state.index]);

	return (
		<div>
			<div>
				<NavBar tabActive="1" />
				<h4 className="main">{parks[props.location.state.index].fullName}</h4>
				<img
					className="park-picture"
					alt={parks[props.location.state.index].images[0].altText}
					src={parks[props.location.state.index].images[0].url}
				/>
				<div className="main-body container">
					<span>Description:</span>
					<p>{parks[props.location.state.index].description}</p>
					<span>Website url: </span>
					<a href={parks[props.location.state.index].url}>
						{parks[props.location.state.index].url}
					</a>
					<div>
						<span>Directions info:</span>
						<p>{parks[props.location.state.index].directionsInfo}</p>
					</div>
					<div>
						<h5>{parks[props.location.state.index].entranceFees[0].title}</h5>
						<p>${parks[props.location.state.index].entranceFees[0].cost}</p>
					</div>
					<div>
						<span>Standard operation hours:</span>
						<p>
							Sunday:
							{
								parks[props.location.state.index].operatingHours[0]
									.standardHours.sunday
							}
						</p>
						<p>
							Monday:
							{
								parks[props.location.state.index].operatingHours[0]
									.standardHours.monday
							}
						</p>
						<p>
							Tuesday:
							{
								parks[props.location.state.index].operatingHours[0]
									.standardHours.tuesday
							}
						</p>
						<p>
							Wednesday:
							{
								parks[props.location.state.index].operatingHours[0]
									.standardHours.wednesday
							}
						</p>
						<p>
							Thursday:
							{
								parks[props.location.state.index].operatingHours[0]
									.standardHours.thursday
							}
						</p>
						<p>
							Friday:
							{
								parks[props.location.state.index].operatingHours[0]
									.standardHours.friday
							}
						</p>
						<p>
							Saturday:
							{
								parks[props.location.state.index].operatingHours[0]
									.standardHours.saturday
							}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SpecificPark;
