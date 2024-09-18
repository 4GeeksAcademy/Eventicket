import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../styles/navbar.css'; // Asegúrate de que este archivo esté incluido
import loguito2 from "../../img/logito2.png";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${scrolled ? 'scrolled' : ''}`}>
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src={loguito2} style={{ height: '40px', marginRight: '10px' }} alt="EvenTicket Logo" />
        <span className="navbar-brand-text">EvenTicket</span>
      </Link>
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
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Categorías
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
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
        <form className="d-flex my-2 my-lg-0">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar"
            aria-label="Search"
          />
          <button className="btn btn-outline-light" type="submit">Buscar</button>
        </form>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              <button className="btn btn-outline-custom">Iniciar Sesión</button>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/registro" className="nav-link">
              <button className="btn btn-outline-custom2">Registrarse</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
