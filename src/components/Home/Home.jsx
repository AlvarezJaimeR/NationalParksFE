import NavBar from "../NavBar/NavBar";
import "./Home.css";

const Home = () => {
	return (
		<div>
			<NavBar tabActive="0" />
			<h1 className="home">Hello Home!</h1>
		</div>
	);
};

export default Home;
