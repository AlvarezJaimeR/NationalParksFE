import NavBar from "../NavBar/NavBar";
import UseForm from "../UseForm/UseForm";
import React, { useState, useEffect } from "react";
import "./RegisterPage.css";
import { useAppContext } from "../../libs/contextLib";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ROOT_URL } from "../../apiRoot";

const RegisterPage = () => {
	const { errors, values, handleChange, handleSubmit, setValues } =
		UseForm(register);
	const [selectedItem, setSelectedItem] = useState(0);
	const history = useHistory();
	const { userHasAuthenticated, setLoggedInUser } = useAppContext();
	const imgNames = ["Bison", "Antelope", "Eagle", "Cougar", "Bear"];

	useEffect(() => {
		const random = Math.floor(Math.random() * imgNames.length);
		setValues((values) => ({
			...values,
			icon: `https://dry-coast-86029.herokuapp.com/images/${imgNames[random]}.png`,
		}));
	}, []);

	function highlightImage(name, index) {
		//console.log(name);
		//console.log("clicked index:", index);
		setSelectedItem(index);
		//console.log(selectedItem);
		//console.log(values);
		setValues((values) => ({
			...values,
			icon: name.target.src,
		}));
		//console.log(values);
	}

	async function register() {
		//console.log("Hit register Button");
		const { confirmPassword, ...users } = values;
		//console.log(values);
		//console.log(users);

		await axios
			.post(`${ROOT_URL}api/users/`, users)
			.then((response) => {
				localStorage.setItem("token", response.headers["x-auth-token"]);
				userHasAuthenticated(true);
				setLoggedInUser(response.data);
				history.push("/");
			})
			.catch((error) => {
				//console.log(error);
				//console.log(error.response.data);
			});
	}

	return (
		<div>
			<NavBar tabActive="n/a" />
			<div className="center" id="register-container">
				<div className="center full-box">
					<h1 className="text-center">User Registration</h1>
					<form onSubmit={handleSubmit}>
						<div className="input-group mb-3">
							<span className="input-group-text">First Name</span>
							<input
								className="form-control"
								type="text"
								name="firstName"
								id="firstName"
								aria-describedby="firstNameHelp"
								value={values.firstName || ""}
								onChange={handleChange}
								required={true}
							/>
							<span className="input-group-text">Last Name</span>
							<input
								className="form-control"
								type="text"
								name="lastName"
								id="lastName"
								aria-describedby="lastNameHelp"
								value={values.lastName || ""}
								onChange={handleChange}
								required={true}
							/>
						</div>
						<div className="input-group mb-3">
							<span className="input-group-text">Email address</span>
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
						<div className="input-group mb-3">
							<span className="input-group-text">Password</span>
							<input
								className="form-control"
								type="password"
								name="password"
								id="password"
								value={values.password || ""}
								onChange={handleChange}
								required={true}
							/>
							<p className="errors">
								{errors.password ? `${errors.password}` : null}
							</p>
						</div>
						<div className="input-group mb-3">
							<span className="input-group-text">Confirm Password</span>
							<input
								className="form-control"
								type="password"
								name="confirmPassword"
								id="confirmPassword"
								value={values.confirmPassword || ""}
								onChange={handleChange}
								required={true}
							/>
							<p className="errors">
								{errors.confirmPassword ? `${errors.confirmPassword}` : null}
							</p>
						</div>
						<div className="container">
							<div className="row">
								<div className="col-sm-4 text-center-title">
									<span className="icon-pick">Pick an icon below!</span>
								</div>
								<div className="col-sm-5 text-center-text">
									<p>Your current icon is: </p>
								</div>
								<div className="col-sm-3">
									<img src={values.icon}></img>
								</div>
							</div>
							<div className="row ">
								<div className="col-1"></div>
								{imgNames.map((name, index) => (
									<div className="col-2 icon-list">
										<div
											key={index}
											onClick={(e) => highlightImage(e, name, index)}
											style={{}}
											className={selectedItem === name.id ? "hover" : null}>
											<img
												src={
													process.env.PUBLIC_URL + `images/${name}.png`
												}></img>
										</div>
									</div>
								))}
								<div className="col-1"></div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-5"></div>
							<div className="col-sm-4">
								<button
									type="submit"
									className="btn btn-outline-primary btn-center">
									Submit
								</button>
							</div>
							<div className="col-sm-3"></div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
