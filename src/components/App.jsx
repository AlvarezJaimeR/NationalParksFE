import store from "../store";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";

function App() {
	return (
		//<Provider store={store}>
		<div>
			<Switch>
				{/* <Route path="/login" render={(props) => <LoginPage {...props} login={true} />} /> */}
				{/* <Route path="/logout" render={(props) => <LoginPage {...props} login={false} />} /> */}
				<Route path="/" exact component={Home} />
				{/* <Route path="/otherUserProfilePage" component={OtherUserProfilePage} /> */}
				{/* <Route path="/searchUserPage" component={SearchUserPage} /> */}
			</Switch>
			<h1>Hello World!</h1>
		</div>
		//</Provider>
	);
}

export default App;
