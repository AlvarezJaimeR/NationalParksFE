import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import "./Travelers.css";

const Travelers = () => {
	const dispatch = useDispatch();

	return (
		<div>
			<NavBar tabActive="1" />
			<h1 className="main">Travelers!</h1>
		</div>
	);
};

export default Travelers;
