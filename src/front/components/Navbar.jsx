import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { logout, protectedRoute } from '../hooks/actions';
import useGlobalReducer from '../hooks/useGlobalReducer.jsx';

export const Navbar = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const { store, dispatch } = useGlobalReducer();
	const [userEmail, setUserEmail] = useState(null);
	useEffect(() => {
		// window.sessionStorage.getItem('token')
		// 	? setIsAuthenticated(true)
		// 	: setIsAuthenticated(false);
		const checkAuthentication = async () => {
			const { data, ok } = await protectedRoute();
			if (ok) {
				setIsAuthenticated(true);
				setUserEmail(data.logged_in_as);
			} else {
				logout();
				dispatch({ type: 'updateToken', payload: null });
				setIsAuthenticated(false);
			}
		};
		const token = localStorage.getItem('token');
		if (!store.token && token) {
			dispatch({ type: 'updateToken', payload: { token } });
			checkAuthentication();
		} else if (store.token) {
			checkAuthentication();
		}
	}, [store.token, dispatch]);

	const handleLogout = () => {
		logout();
		dispatch({ type: 'updateToken', payload: { token: null } });
		setIsAuthenticated(false);
		// localStorage.removeItem('token');
		// window.sessionStorage.removeItem('token');
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link className="text-decoration-none" to="/">
					<span className="navbar-brand mb-0 h1 ">Home</span>
				</Link>
				<div className="ml-auto">
					{store.token ? (
						<>
							<p>welcome,{userEmail}</p>
							<Link to="/">
								<button className="btn btn-primary" onClick={handleLogout}>
									Log Out
								</button>{' '}
							</Link>
						</>
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
