import store from "../store";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";

function App() {
	return (
		<Provider store={store}>
			<div>
				<Switch>
					{/* <Route path="/login" render={(props) => <LoginPage {...props} login={true} />} /> */}
					{/* <Route path="/logout" render={(props) => <LoginPage {...props} login={false} />} /> */}
					<Route path="/" exact component={Home} />
					<Route path="/login" component={LoginPage} />
					<Route path="/register" component={RegisterPage} />
					{/* <Route path="/otherUserProfilePage" component={OtherUserProfilePage} /> */}
					{/* <Route path="/searchUserPage" component={SearchUserPage} /> */}
				</Switch>
			</div>
		</Provider>
	);
}

export default App;
