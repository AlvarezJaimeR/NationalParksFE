import NavBar from "../NavBar/NavBar";
import React, { useState } from "react";
import UseForm from "../UseForm/UseForm";
import "./LoginPage.css";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";
import axios from "axios";

const LoginPage = () => {
	const { values, handleChange, handleSubmit } = UseForm(login);
	const { setJwt, isAuthenticated, userHasAuthenticated } = useAppContext();
	const history = useHistory();

	async function login() {
		await axios
			.post("http://localhost:5000/api/auth", values)
			.then((response) => {
				localStorage.setItem("token", response.data);
				userHasAuthenticated(true);
				setJwt(localStorage.getItem("token"));
				history.push("/allParks");
			})
			.catch((error) => {
				console.log(error);
				alert(error.response.data);
			});
	}

	return (
		<div className="row">
			<div className="pb-5">
				<NavBar tabActive="n/a" />
			</div>
			<div className="center" id="login-container">
				<div className="center small-box">
					<h1 className="text-center">User Login</h1>
					{!isAuthenticated ? (
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="userEmail" className="form-label">
									Email address
								</label>
								<input
									className="form-control"
									type="email"
									name="email"
									id="userEmail"
									aria-describedby="emailHelp"
									value={values.email || ""}
									onChange={handleChange}
									required={true}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="userPassword" className="form-label">
									Password
								</label>
								<input
									className="form-control"
									type="password"
									name="password"
									id="userPassword"
									value={values.password || ""}
									onChange={handleChange}
									required={true}
								/>
							</div>
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
						</form>
					) : (
						<h3>You're already logged in!</h3>
					)}
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
