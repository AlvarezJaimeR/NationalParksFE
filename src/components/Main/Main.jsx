import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../libs/contextLib";
import axios from "axios";
import "./Main.css";

const Main = () => {
	const { loggedInUser, setLoggedInUser, isAuthenticated } = useAppContext();
	const [parks, setParks] = useState([]);

	useEffect(() => {
		getParks();
	}, []);

	async function getParks() {
		await axios
			.get(
				`https://developer.nps.gov/api/v1/parks?&api_key=t6gYQ5xCA0LgivhLEO2zbVfKa3pWcZcdix1CPozR`
			)
			.then((response) => {
				console.log(response);
				setParks(response.data.data);
			})
			.catch((error) => {
				console.log(error);
				alert(error.response.data);
			});
	}

	function nationalParkOnly() {
		console.log("filter for only National Parks");
		console.log(parks);
		const tempParks = parks.filter(
			(parks) => parks.designation === "National Park"
		);
		console.log("tempParks", tempParks);
		setParks(tempParks);
	}

	return parks.length > 0 ? (
		<div>
			<NavBar tabActive="1" />
			<h1 className="main">National Parks!</h1>
			<div className="container">
				<div className="row">
					{parks.map((park, index) => (
						<div key={index} className="card" style={{ width: "11em" }}>
							<a href="/specificPark" className="card-body">
								{park.name}
							</a>
						</div>
					))}
				</div>
			</div>
			<button onClick={() => nationalParkOnly()}>Filter</button>
		</div>
	) : (
		<h1>Loading...</h1>
	);
};

/* class Main extends Component {
	componentDidMount() {
		console.log("get parks!");
		this.props.getPark();
	}

	nationalParkOnly() {
		console.log("filter for only National Parks");
		console.log(this.props.parks);
		let parks = this.props.parks;
		console.log(parks);
		const parkTemp = this.props.filterNationalPark(parks);
		console.log(parkTemp);
	}

	mapNationalParks() {
		console.log("park items", this.props.parks);
		return (
			<div className="container">
				<div className="row">
					{this.props.parks.map((park, index) => (
						<div key={index} className="card" style={{ width: "11em" }}>
							<a href="/specificPark" className="card-body">
								{park.name}
							</a>
						</div>
					))}
				</div>
			</div>
		);
	}

	render() {
		return (
			<div>
				<NavBar tabActive="1" />
				<h1 className="main">National Parks!</h1>
				{this.mapNationalParks()}
				<button onClick={() => this.nationalParkOnly()}>Filter</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	parks: state.park.items,
}); */

export default Main;
