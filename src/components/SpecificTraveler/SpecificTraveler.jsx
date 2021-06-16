import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../libs/contextLib";
import "./SpecificTraveler.css";

const SpecificTraveler = (props) => {
	console.log(props.location.state);
	const { loggedInUser, totalUsers, parks } = useAppContext();
	console.log(props.location.state.users[props.location.state.index]);

	return (
		<div>
			<NavBar tabActive="2" />
			<div>
				<h4 className=" main">
					{props.location.state.users[props.location.state.index].firstName +
						" " +
						props.location.state.users[props.location.state.index].lastName}
				</h4>
				<img
					className="icon-pic"
					src={props.location.state.users[props.location.state.index].icon}
				/>
			</div>
			<div className="user-parks">Visited Parks:</div>
			<div className="user-parks">Parks Wishlist:</div>
		</div>
	);
};

export default SpecificTraveler;
