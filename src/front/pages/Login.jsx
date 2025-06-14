import React, { useEffect, useState } from "react"
// import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { login } from "../hooks/actions";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const { store, dispatch } = useGlobalReducer()

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { data, ok } = await login(email, password)
		if (ok) {
			console.log("Login successfull", data)
			window.sessionStorage.setItem('accessToken', data.access_token)
			console.log(window.sessionStorage.getItem('accessToken'))
			navigate('/private')
		}


	}




	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
					<input type="email" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} id="email" placeholder="name@example.com" autoComplete="off" />
				</div>
				<div className="mb-3">
					<label htmlFor="exampleFormControlTextarea1" className="form-label">Password</label>
					<input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="***********" autoComplete="off" />
				</div>
				<div>
					<button type="submit" className="btn btn-primary mb-3" >Submit</button>
				</div>
			</form>
		</div>
	);
}; 