import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Private = () => {

	const { store, dispatch } = useGlobalReducer()



	return (
		<div className="text-center mt-5">
			<h1 className="display-4">Private Page</h1>


		</div>
	);
}; 