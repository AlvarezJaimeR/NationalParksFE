import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../libs/contextLib";

const SpecificTraveler = (props) => {
	console.log(props.location.state);
	const { loggedInUser, totalUsers, parks } = useAppContext();
	console.log(totalUsers[props.location.state.index]);

	return (
		<div>
			<NavBar tabActive="2" />
			<h4 className="main">Specific Traveler!</h4>
		</div>
	);
};

export default SpecificTraveler;
