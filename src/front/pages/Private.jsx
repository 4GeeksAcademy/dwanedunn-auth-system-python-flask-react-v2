import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Private = () => {

	const { store, dispatch } = useGlobalReducer()
	const [isAuthenticated, setIsAuthenticated] = useState(false);


	useEffect(() => {

		(window.sessionStorage.getItem('accessToken') ? setIsAuthenticated(true) : setIsAuthenticated(false))
		// 	const token = window.sessionStorage.getItem('accessToken');
		// setIsAuthenticated(!!token);
	}, []);

	return (
		isAuthenticated ?
			<div className="text-center mt-5">
				<h1 className="display-4">Private Page</h1>
			</div>
			: <h1 className="text-center mt-5"> Not Logged in! Please login</h1>
	);

}; 