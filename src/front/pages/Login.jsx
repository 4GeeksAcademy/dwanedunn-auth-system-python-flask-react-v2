import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Login = () => {

	const { store, dispatch } = useGlobalReducer()



	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<section>
			<form>
				<input type="text" name="" id="" />
				<input type="text" name="" id="" />
				<button type="submit">Login</button>
			</form>
		</section>
	);
}; 