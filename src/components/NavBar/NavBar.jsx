import { useHistory } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";
import "./NavBar.css";

const NavBar = (props) => {
	const history = useHistory();
	const { isAuthenticated, userHasAuthenticated } = useAppContext();

	function logoutButton() {
		try {
			localStorage.removeItem("token");
			userHasAuthenticated(false);
			history.push("/");
		} catch (error) {}
	}

	return (
		<nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
			{isAuthenticated === false ? (
				<div className="container-fluid">
					<a className="navbar-brand" href="/">
						<img
							src={process.env.PUBLIC_URL + `images/Mountain2.png`}
							//src="https://images.unsplash.com/photo-1564604352708-b786936ea993?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
							alt="logo"
							width="50"
							height="200"
							className="d-inline-block align-text-top"
						/>
						Parkapalooza!
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
						</ul>
					</div>

					<div className="sm-p-left btn-group">
						<>
							<a className="btn btn-outline-primary" href="/register">
								Register
							</a>
							<a className="btn btn-outline-success" href="/login">
								Sign In
							</a>
						</>
					</div>
				</div>
			) : (
				<div className="container-fluid">
					<a className="navbar-brand" href="/">
						<img
							src={process.env.PUBLIC_URL + `images/Mountain2.png`}
							//src="https://images.unsplash.com/photo-1564604352708-b786936ea993?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
							alt="logo"
							width="50"
							height="200"
							className="d-inline-block align-text-top"
						/>
						Parkapalooza!
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
						</ul>
					</div>
					<div className="sm-p-left">
						<button
							className="btn btn-outline-danger"
							onClick={() => logoutButton()}>
							Logoff
						</button>
					</div>
				</div>
			)}
		</nav>
	);
};

export default NavBar;
