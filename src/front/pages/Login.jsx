import React, { useEffect } from "react"
// import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Login = () => {

	const { store, dispatch } = useGlobalReducer()



	// useEffect(() => {
	// 	loadMessage()
	// }, [])

	return (
		<div className="container">
			<form>
				<div className="mb-3">
					<label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
					<input type="email" className="form-control" id="email" placeholder="name@example.com" />
				</div>
				<div className="mb-3">
					<label htmlFor="exampleFormControlTextarea1" className="form-label">Password</label>
					<input type="password" className="form-control" id="password" placeholder="***********" />
				</div>
				<div>
					<button type="submit" class="btn btn-primary mb-3">Submit</button>
				</div>
			</form>
		</div>
	);
}; 