import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { logout, protectedRoute } from '../hooks/actions';


export const Navbar = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		// window.sessionStorage.getItem('token')
		// 	? setIsAuthenticated(true)
		// 	: setIsAuthenticated(false);
		const checkAuthentication = async () => {
			const { ok } = await protectedRoute();
			if (ok) {
				setIsAuthenticated(true);
			} else { setIsAuthenticated(false) }
		}
		checkAuthentication();
	}, []);

	const handleLogout = () => {
		logout();
		setIsAuthenticated(false);
		localStorage.removeItem('token');
		// window.sessionStorage.removeItem('token');
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link className="text-decoration-none" to="/">
					<span className="navbar-brand mb-0 h1 ">Home</span>
				</Link>
				<div className="ml-auto">
					{isAuthenticated ? (
						<Link to="/">
							<button className="btn btn-primary" onClick={handleLogout}>
								Log Out
							</button>{' '}
						</Link>
					) : (
						<Link to="/login">
							<button className="btn btn-primary">Log In</button>
						</Link>
					)}

					<Link to="/signup">
						<button className="btn btn-primary">Signup</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
