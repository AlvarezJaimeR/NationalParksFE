import NavBar from "../NavBar/NavBar";

const SpecificTraveler = (props) => {
	console.log(props.location.state);

	return (
		<div>
			<NavBar tabActive="2" />
			<h4 className="main">Specific Traveler!</h4>
		</div>
	);
};

export default SpecificTraveler;
