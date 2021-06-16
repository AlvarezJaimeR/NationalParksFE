import react, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";

const NavBar = (props) => {
	const history = useHistory();
	const { isAuthenticated, userHasAuthenticated } = useAppContext();

	function logoutButton() {
		try {
			console.log("logout button!");
			localStorage.removeItem("token");
			userHasAuthenticated(false);
			history.push("/");
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
			<div className="container-fluid">
				<a className="navbar-brand" href="/">
					<img
						//src={logo}
						alt="logo"
						width="30"
						height="24"
						className="d-inline-block align-text-top"
					/>
					National Park Scratch-Off!
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse sm-p-left"
					id="navbarSupportedContent">
					<ul className="nav nav-tabs">
						<li className="nav-item">
							<a
								className={
									props.tabActive === "0" ? "nav-link active" : "nav-link"
								}
								aria-current={props.tabActive === "0" ? "page" : ""}
								href="/">
								Home
							</a>
						</li>
						<li className="nav-item">
							<a
								className={`${
									props.tabActive === "1" ? "nav-link active" : "nav-link"
								} 
                                `}
								aria-current={props.tabActive === "1" ? "page" : ""}
								href="/allParks">
								All Parks
							</a>
						</li>

						<li className="nav-item">
							<a
								className={
									props.tabActive === "2" ? "nav-link active" : "nav-link"
								}
								aria-current={props.tabActive === "2" ? "page" : ""}
								href="/allTravelers">
								See Travelers
							</a>
						</li>
						<li className="nav-item">
							<a
								className={
									props.tabActive === "3" ? "nav-link active" : "nav-link"
								}
								aria-current={props.tabActive === "3" ? "page" : ""}
								href="/about"
								tabIndex="-1">
								About Site
							</a>
						</li>
					</ul>
					<div className="sm-p-left btn-group">
						{isAuthenticated === false ? (
							<>
								<a className="btn btn-outline-primary" href="/register">
									Register
								</a>
								<a className="nav-link" href="/login">
									Sign In
								</a>
							</>
						) : (
							<button
								className="btn btn-outline-danger"
								onClick={() => logoutButton()}>
								Logoff
							</button>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
