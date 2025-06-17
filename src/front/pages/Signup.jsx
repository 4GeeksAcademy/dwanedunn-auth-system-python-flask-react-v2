import React, { useEffect, useState } from "react"
// import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { login } from "../hooks/actions";
import { useNavigate } from "react-router-dom";

// TODO: Refactor as needed to implement signup functionality
export const Signup = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const { store, dispatch } = useGlobalReducer()

	// TODO: Implement the signup functionality
	const handleSignUp = async (e) => {
		e.preventDefault();
		const { data, ok } = await login(email, password)
		if (ok) {
			console.log("Sign up successfull", data)
			// window.sessionStorage.setItem('accessToken', data.access_token)
			console.log(window.sessionStorage.getItem('accessToken'))
			// navigate('/private')
		}
	}

	// TODO: Refactor the form to handle signup instead of login
	return (
		<div className="container">
			<form onSubmit={handleSignUp}>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">Email address</label>
					<input type="email" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} id="email" placeholder="name@example.com" autoComplete="off" />
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">Password</label>
					<input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="***********" autoComplete="off" />
				</div>
				<div>
					<button type="submit" className="btn btn-primary mb-3" >Submit</button>
				</div>
			</form>
		</div>
	);
};