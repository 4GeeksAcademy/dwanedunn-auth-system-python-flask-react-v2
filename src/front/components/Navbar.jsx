import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";


export const Navbar = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {

		(window.sessionStorage.getItem('accessToken') ? setIsAuthenticated(true) : setIsAuthenticated(false))
	}, []);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 ">Home</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-primary">Log In</button>
					</Link>
					<Link to="/signup">
						<button className="btn btn-primary">Signup</button>
					</Link>
					<Link to="#">
						<button className="btn btn-primary" onClick={() => window.sessionStorage.removeItem('accessToken')}>Log Out</button>
					</Link>
				</div>
			</div>
		</nav >
	);
};