import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import Main from "./Main/Main";
import Traveler from "./Traveler/Traveler";
import SpecificPark from "./SpecificPark/SpecificPark.jsx";
import SpecificTraveler from "./SpecificTraveler/SpecificTraveler";
import { AppContext } from "../libs/contextLib";
import EditPost from "./EditPost/EditPost";
import axios from "axios";
import { ROOT_URL } from "../apiRoot";

function App() {
	const [loggedInUser, setLoggedInUser] = useState();
	const [jwt, setJwt] = useState(() => localStorage.getItem("token"));
	const [isAuthenticated, userHasAuthenticated] = useState(false);
	const [isAuthenticating, setIsAuthenticating] = useState(true);
	const [headers, setHeaders] = useState();
	const [totalUsers, setTotalUsers] = useState([]);
	const [parks, setParks] = useState([]);

	useEffect(() => {
		onLoad();
		getParks();
	}, []);

	useEffect(() => {
		if (jwt !== null) {
			try {
				setLoggedInUser(jwtDecode(jwt));
			} catch (error) {}
		}
		setHeaders({
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": `${jwt}`,
			},
		});
	}, [jwt]);

	async function onLoad() {
		await axios.get(`${ROOT_URL}api/users`).then((response) => {
			setTotalUsers(response.data);
		});
		if (jwt !== null) {
			try {
				await setLoggedInUser(jwtDecode(jwt));
				userHasAuthenticated(true);
			} catch (error) {
				if (error !== "InvalidTokenError: Invalid token specified") {
				}
			}
		}
		setIsAuthenticating(false);
	}

	async function getParks() {
		await axios
			.get(
				`https://developer.nps.gov/api/v1/parks?limit=500&api_key=${process.env.REACT_APP_NPS_API_KEY}`
			)
			.then((response) => {
				const tempParks = response.data.data.filter(
					(parks) =>
						parks.designation === "National Park" ||
						parks.designation === "National Parks" ||
						parks.designation === "National Park & Preserve" ||
						parks.parkCode === "npsa" ||
						parks.parkCode === "neri" ||
						parks.parkCode === "redw"
				);
				setParks(tempParks);
			})
			.catch((error) => {
				alert(error.response.data);
			});
	}

	return (
		!isAuthenticating && (
			<div>
				<AppContext.Provider
					value={{
						isAuthenticated,
						userHasAuthenticated,
						loggedInUser,
						setLoggedInUser,
						jwt,
						setJwt,
						headers,
						setHeaders,
						totalUsers,
						setTotalUsers,
						parks,
						setParks,
					}}>
					<Switch>
						{/* <Route path="/login" render={(props) => <LoginPage {...props} login={true} />} /> */}
						<Route path="/" exact component={Home} />
						<Route path="/login" component={LoginPage} />
						<Route path="/register" component={RegisterPage} />
						<Route path="/allParks" component={Main} />
						<Route path="/allTravelers" component={Traveler} />
						<Route path="/specificPark" component={SpecificPark} />
						<Route path="/specificTraveler" component={SpecificTraveler} />
						<Route path="/editPost" component={EditPost} />
					</Switch>
				</AppContext.Provider>
			</div>
		)
	);
}

export default App;
