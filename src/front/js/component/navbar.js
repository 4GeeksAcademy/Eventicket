import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/navbar.css';
import loguito2 from "../../img/logito2.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const { currentUser, admin } = store;
  const navigate=useNavigate()
  const categories = [
    { "name": "Cursos", "link": "/cursos" },
    { "name": "Entretenimiento", "link": "/entretenimiento" },
    { "name": "Deportes", "link": "/deportes" },
    { "name": "Conciertos", "link": "/conciertos" }
  ];

  const handleLogout = () => {
   actions.logout()
   navigate("/")
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        {/* Logo y nombre de la marca */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img className="mt-2 ms-1" src={loguito2} style={{ height: '30px', marginRight: '8px' }} alt="EvenTicket Logo" />
          <span className="navbar-brand-text mb-0 mt-2">EvenTicket</span>
        </Link>
        
        {/* Botón de toggle para móviles */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del navbar */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="row w-100">
            
            {/* Formulario de búsqueda */}
            <div className="col-12 col-lg-4 my-auto">
              <form className="d-flex search-container">
                <div className="icon-wrapper">
                  <i className="fa-solid fa-magnifying-glass search-icon text-white"></i>
                </div>
                <input
                  className="form-control input-search me-2 rounded-pill w-100"
                  type="search"
                  placeholder="           ¡Entradas para tu atracción soñada!"
                  aria-label="Search"
                />
              </form>
            </div>

            {/* Categorías de navegación */}
            {admin?"Disfruta tu panel de administrador":
              <div className="col-12 col-lg-5 my-auto">
              <ul className="navbar-nav navbar-categorias">
                {categories.length > 0 && categories.map((category, index) =>
                  <li className="nav-item" key={index}>
                    <Link to={category.link} className="nav-link nav-link-categorias active" aria-current="page">
                      <i className="fa-solid fa-microphone me-2"></i>{category.name}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            }
          

            {/* Botones de inicio de sesión/registro o perfil */}
            <div className="col-12 col-lg-3 d-flex justify-content-end">
              <ul className="navbar-nav mb-2 mb-lg-0">
                {!currentUser && !admin ? (
                  <>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">
                        <button className="btn-outline-custom">Iniciar Sesión</button>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/registro" className="nav-link">
                        <button className="btn-outline-custom2">Registrarse</button>
                      </Link>
                    </li>
                  </>
                ) : (
                  <div className="d-flex flex-row align-items-center gap-3">
                    {currentUser && !admin && (
                      <li className="nav-item">
                        <Link to="/user" className="nav-link">
                          <button className="btn btn-outline-info">Mi Perfil</button>
                        </Link>
                      </li>
                    )}
                  {!currentUser && admin && (
                      <li className="nav-item">
                        <Link to="/demo" className="nav-link">
                          <button className="btn btn-outline-info">Mi panel</button>
                        </Link>
                      </li>
                    )}
                    <li className="nav-item">
                      <Link to="/">
                        <button className="btn btn-outline-danger" onClick={handleLogout}>
                          Cerrar Sesión
                        </button>
                      </Link>
                    </li>
                  </div>
                )}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};
