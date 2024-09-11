import React from "react";
import { Link } from "react-router-dom";
import '../../styles/home.css';

export const Navbar = () => {
	return (
		// 	<nav className="navbar navbar-light">
		// 		<div className="container">
		// 			<Link to="/">
		// 				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
		// 			</Link>
		// 			<div className="ml-auto">
		// 				<Link to="/demo">
		// 					<button className="btn btn-primary">Check the Context in action</button>
		// 				</Link>
		// 			</div>
		// 		</div>
		// 	</nav>
		// );





		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">Logo</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					


					<form className="d-flex" role="search">
						<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
						<button className="btn btn-outline-success" type="submit">Search</button>
					</form>


					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						

						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Categorias
							</a>

							<ul className="dropdown-menu">
								<li><a className="dropdown-item" href="#">Conciertos</a></li>
								<li><a className="dropdown-item" href="#">Deportes</a></li>
								<li><a className="dropdown-item" href="#">Entretenimiento</a></li>
								<li><a className="dropdown-item" href="#">Cursos</a></li>
								{/* <li><hr className="dropdown-divider" />Cursos</li> */}
							</ul>
						</li>

					</ul>
					<div>
						<i className="fa-solid carrito fa-cart-shopping"></i>
					</div>


					<ul className="nav nav-pills">
						<li className="nav-item nav-item-login">
							<a className="nav-link active" aria-current="page" href="#">Iniciar Sesion</a>
						</li>
						<li className="nav-item nav-item-register">
							<a className="nav-link active" aria-current="page" href="#">Registrarse</a>
						</li>
					</ul>


				</div>
			</div>
		</nav>
	);
};





