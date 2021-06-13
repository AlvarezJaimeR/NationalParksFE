import store from "../store";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import Authentication from "./Authentication/Authentication";
import Main from "./Main/Main";

function App() {
	return (
		<Provider store={store}>
			<div>
				<Switch>
					{/* <Route path="/login" render={(props) => <LoginPage {...props} login={true} />} /> */}
					{/* <Route path="/logout" render={(props) => <LoginPage {...props} login={false} />} /> */}
					<Route path="/" exact component={Home} />
					<Route path="/auth" exact component={Authentication} />
					<Route path="/login" component={LoginPage} />
					<Route path="/register" component={RegisterPage} />
					<Route path="/allParks" component={Main} />
					{/* <Route path="/otherUserProfilePage" component={OtherUserProfilePage} /> */}
					{/* <Route path="/searchUserPage" component={SearchUserPage} /> */}
				</Switch>
			</div>
		</Provider>
	);
}

export default App;
