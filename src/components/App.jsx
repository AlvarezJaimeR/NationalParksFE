import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import Main from "./Main/Main";
import Travelers from "./Travelers/Travelers";
import SpecificPark from "./SpecificPark/SpecificPark.jsx";
import { AppContext } from "../libs/contextLib";
import axios from "axios";

function App() {
	const [loggedInUser, setLoggedInUser] = useState();
	const [jwt, setJwt] = useState(() => localStorage.getItem("token"));
	const [isAuthenticated, userHasAuthenticated] = useState(false);
	const [isAuthenticating, setIsAuthenticating] = useState(true);
	const [headers, setHeaders] = useState();

	useEffect(() => {
		onLoad();
	}, []);

	useEffect(() => {
		if (jwt !== null) {
			try {
				setLoggedInUser(jwtDecode(jwt));
			} catch (error) {
				console.log(error);
			}
		}
		setHeaders({
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": `${jwt}`,
			},
		});
	}, [jwt]);

	async function onLoad() {
		if (jwt !== null) {
			try {
				await setLoggedInUser(jwtDecode(jwt));
				userHasAuthenticated(true);
			} catch (error) {
				if (error !== "InvalidTokenError: Invalid token specified") {
					console.log("No user logged in");
				}
			}
		}
		setIsAuthenticating(false);
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
					}}>
					<Switch>
						{/* <Route path="/login" render={(props) => <LoginPage {...props} login={true} />} /> */}
						{/* <Route path="/logout" render={(props) => <LoginPage {...props} login={false} />} /> */}
						<Route path="/" exact component={Home} />
						<Route path="/login" component={LoginPage} />
						<Route path="/register" component={RegisterPage} />
						<Route path="/allParks" component={Main} />
						<Route path="/allTravelers" component={Travelers} />
						<Route path="/specificPark" component={SpecificPark} />
					</Switch>
				</AppContext.Provider>
			</div>
		)
	);
}

export default App;
