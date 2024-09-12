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


        <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                {/* Logo(aun no aplicado) y name */}
				<Link to="/">
                	<a className="navbar-brand" href="#">Logo</a>
				</Link>
                
                {/* Formulario de búsqueda */}
                <form className="d-flex formulario-container" role="search">
                    <input className="form-control rounded-pill" type="search" placeholder="Buscar" aria-label="Search" />
                    {/* <button className="btn btn-outline-success" type="submit">Buscar</button> */}
                </form>

                {/* Categorías */}
                <ul className="navbar-nav">
                    
                </ul>

               
                {/* Botones de Iniciar sesión y Registrarse */}
                <ul className="nav nav-pills gap-3">
					<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Categorías
							</a>
							<ul className="dropdown-menu">
								<Link to="/conciertos">
									<li><a className="dropdown-item" href="#">Conciertos</a></li>
								</Link>
								<Link to="/deportes">
									<li><a className="dropdown-item" href="#">Deportes</a></li>
								</Link>
								<Link to="/entrenenimiento">
									<li><a className="dropdown-item" href="#">Entretenimiento</a></li>
								</Link>
								<Link to="/cursos">
									<li><a className="dropdown-item" href="#">Cursos</a></li>
								</Link>
							</ul>
					</li>
					{/* Carrito de compras */}
					<i className="fa-solid fa-cart-shopping carrito text-align-center"></i>
					<Link to="/demo">
						<li className="nav-item ">
							<a className="nav-link nav-item-login" aria-current="page" href="#">Iniciar Sesión</a>
						</li>
					</Link>
					<Link to="/register">

                    <li className="nav-item ">
                        <a className="nav-link nav-item-register" href="#">Registrarse</a>
						{/* rounded-lg */}
                    </li>
					</Link>
                </ul>
            </div>
        </nav>
    );
};






