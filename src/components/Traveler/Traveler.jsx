import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import "./Traveler.css";
import { useAppContext } from "../../libs/contextLib";

const Travelers = () => {
	const { totalUsers, setTotalUsers } = useAppContext();

	return (
		<div>
			<NavBar tabActive="1" />
			<h1 className="main">Travelers!</h1>
		</div>
	);
};

export default Travelers;
