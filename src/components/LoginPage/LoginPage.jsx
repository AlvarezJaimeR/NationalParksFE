import NavBar from "../NavBar/NavBar";
import { newAuth } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import UseForm from "../UseForm/UseForm";
import { newUser, login, logout } from "../../actions/usersActions";
import "./LoginPage.css";

const LoginPage = () => {
	const { values, handleChange, handleSubmit } = UseForm(loggedIn);
	const dispatch = useDispatch();

	function loggedIn() {
		console.log("hit login button");
		console.log(values);
		dispatch(newAuth(values));
		dispatch(login());
	}

	return (
		<div className="row">
			<div className="pb-5">
				<NavBar tabActive="n/a" />
			</div>
			<div className="center" id="login-container">
				<div className="center small-box">
					<h1 className="text-center">User Login</h1>
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
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
