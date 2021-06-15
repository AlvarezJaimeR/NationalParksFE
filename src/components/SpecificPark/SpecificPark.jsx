import NavBar from "../NavBar/NavBar";

const SpecificPark = (props) => {
	console.log(props.location.state);

	return (
		<div>
			<NavBar tabActive="1" />
			<h4 className="main">Specific Park!</h4>
		</div>
	);
};

export default SpecificPark;
