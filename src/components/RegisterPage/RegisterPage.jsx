import NavBar from "../NavBar/NavBar";
import UseForm from "../UseForm/UseForm";
import { newUser } from "../../actions/usersActions";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import "./RegisterPage.css";

const RegisterPage = () => {
	const { errors, values, handleChange, handleSubmit } = UseForm(register);
	const [selectedItem, setSelectedItem] = useState(0);
	const dispatch = useDispatch();
	const imgNames = ["B", "C", "G", "L", "S"];
	/*     .map((name, index) => {
		return (
			<img
				key={index}
				alt="animal"
				src={process.env.PUBLIC_URL + `images/${name}.png`}
			/>
		);
	}); */

	function highlightImage(name, index) {
		console.log(name);
		console.log("clicked index:", index);
		setSelectedItem(index);
	}

	function register() {
		console.log("Hit Submit Button");
		const { confirmPassword, ...users } = values;
		console.log(values);
		console.log(users);
		dispatch(newUser(users));
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
						<div>
							<div>
								<span>Pick an Icon!</span>
								{imgNames.map((name, index) => (
									<div
										key={index}
										onClick={() => highlightImage(name, index)}
										className={selectedItem === name.id ? "hover" : null}>
										<img
											src={process.env.PUBLIC_URL + `images/${name}.png`}></img>
									</div>
								))}
							</div>
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

export default RegisterPage;
