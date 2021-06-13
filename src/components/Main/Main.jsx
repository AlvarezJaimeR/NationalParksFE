import NavBar from "../NavBar/NavBar";
import { getPark } from "../../actions/parkAction";
import { useDispatch, useSelector } from "react-redux";
import "./Main.css";

const Main = () => {
	const dispatch = useDispatch();

	function test() {
		dispatch(getPark());
	}
	return (
		<div>
			<NavBar tabActive="1" />
			<h1 className="main">National Parks!</h1>
			<a>{test()}</a>
		</div>
	);
};

export default Main;
