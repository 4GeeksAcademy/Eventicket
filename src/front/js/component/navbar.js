import React from "react";
import { Link } from "react-router-dom";
import '../../styles/home.css';

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg ">
			<div className="container-fluid d-flex justify-content-between align-items-center">
				{/* Logo y nombre */}
				<Link to="/" className="navbar-brand">
					EvenTTicket
				</Link>

				{/* Formulario de búsqueda */}
				<form className="d-flex formulario-container" role="search">
					<input
						className="form-control-busquedad rounded-pill"
						type="search"
						placeholder="Buscar"
						aria-label="Search"
					/>
				</form>

				{/* Categorías */}
				<ul className="navbar-nav">
					<li className="nav-item dropdown">
						<a
							className="nav-link dropdown-toggle px-0"
							href="#"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							Categorías
						</a>
						<ul className="dropdown-menu py-0">
							<li>
								<Link to="/conciertos" className="dropdown-item">
									Conciertos
								</Link>
							</li>
							<li>
								<Link to="/deportes" className="dropdown-item">
									Deportes
								</Link>
							</li>
							<li>
								<Link to="/entretenimiento" className="dropdown-item">
									Entretenimiento
								</Link>
							</li>
							<li>
								<Link to="/cursos" className="dropdown-item">
									Cursos
								</Link>
							</li>
						</ul>
					</li>
				</ul>

				{/* Botones de Iniciar sesión y Registrarse */}
				<ul className="nav nav-pills gap-3">
					{/* Carrito de compras */}
					<div className="mt-1">
						<i className="fa-solid fa-cart-shopping carrito text-align-center"></i>
					</div>

					{/* Iniciar Sesión */}
					<li className="nav-item">
						<Link to="/login" className="nav-link nav-item-login" aria-current="page">
							Iniciar Sesión
						</Link>
					</li>

					{/* Registrarse */}
					<li className="nav-item">
						<Link to="/registro" className="nav-link nav-item-register">
							Registrarse
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};
