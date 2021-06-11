import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../actions/getUsersActions";

const Authentication = () => {
    const [loggedInUser, setLoggedInUser] = useState();
	const [jwt, setJwt] = useState(() => localStorage.getItem("token"));
	const [headers, setHeaders] = useState();
	const [isAuthenticated, userHasAuthenticated] = useState(false);
	const [isAuthenticating, setIsAuthenticating] = useState(true);
	const [allUsers, setAllUsers] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		onLoad();
	}, []);

	useEffect(() => {
		if (jwt !== null) {
			try {
				setLoggedInUser(jwtDecode(jwt));
			} catch (error) {
				console.log(error);
			}
		}
		setHeaders({
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": `${jwt}`,
			},
		});
	}, [jwt]);

	async function onLoad() {
		dispatch(getUsers());
        {console.log(allUsers)}
        {console.log(headers)}
        {console.log(loggedInUser)}
        {console.log(isAuthenticated)}
        {console.log(isAuthenticating)}
        {console.log(jwt)}
		if (jwt !== null) {
			try {
				await setLoggedInUser(jwtDecode(jwt));
				userHasAuthenticated(true);
			} catch (error) {
				if (error !== "InvalidTokenError: Invalid token specified") {
					console.log("No user logged in");
				}
			}
		}
		setIsAuthenticating(false);
	}

    return (
        <div>
            <h1>Authentication</h1>
            {console.log(allUsers)}
            {console.log(headers)}
            {console.log(loggedInUser)}
            {console.log(isAuthenticated)}
            {console.log(isAuthenticating)}
            {console.log(jwt)}
        </div>
    )
}

export default Authentication;