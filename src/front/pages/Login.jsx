import React, { useEffect, useState } from "react"
// import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { login } from "../hooks/actions";

export const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { store, dispatch } = useGlobalReducer()

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { data, ok } = await login(email, password)
		if (ok) {
			console.log("Login successfull")
		}


	}

	// TODO: check if user is already logged in, if so redirect to protected page
	useEffect(() => {
		if (store.user) {
			window.location.href = "/protected" // use navigate from react-router-dom instead
		}
	}, [store.user])


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