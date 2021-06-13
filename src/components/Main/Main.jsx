import NavBar from "../NavBar/NavBar";
import { getPark } from "../../actions/parkAction";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Main.css";

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};
	}
	componentDidMount() {
		console.log("get parks!");
		this.props.getPark();
		this.setState({
			loading: false,
		});
	}

	mapParks() {
		console.log("park items", this.props.parks);
		return this.props.parks.map((park) => (
			<div key={park.id}>
				<p>{park.name}</p>
			</div>
		));
	}

	render() {
		return this.state.loading === false ? (
			<div>
				<NavBar tabActive="1" />
				<h1 className="main">National Parks!</h1>
				<div>{this.mapParks()}</div>
			</div>
		) : (
			<h5 className="main">Loading...</h5>
		);
	}
}

const mapStateToProps = (state) => ({
	parks: state.park.items,
});

export default connect(mapStateToProps, { getPark })(Main);
