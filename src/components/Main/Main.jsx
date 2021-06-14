import NavBar from "../NavBar/NavBar";
import { getPark, filterNationalPark } from "../../actions/parkAction";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Main.css";

class Main extends Component {
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
});

export default connect(mapStateToProps, { getPark, filterNationalPark })(Main);
