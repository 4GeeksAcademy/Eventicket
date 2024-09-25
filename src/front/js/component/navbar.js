import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/navbar.css';
import loguito2 from "../../img/logito2.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const { currentUser, admin } = store;

  const handleLogout = () => {
    if (currentUser) {
      actions.logoutUser();
    } else if (admin) {
      actions.logoutAdmin();
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img className="mt-2 ms-1" src={loguito2} style={{ height: '30px', marginRight: '8px' }} alt="EvenTicket Logo" />
          <span className="navbar-brand-text mb-0 mt-2">EvenTicket</span>
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
                ></input>
              </form>
            </div>
            {/* <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
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
          </ul>  */}
            {/* Categorías */}
            <div className="col-12 col-lg-5 my-auto">
              <ul className="navbar-nav navbar-categorias">

                {/* <li>
                  <Link to="/conciertos" className="dropdown-item">
                    Conciertos
                  </Link>
                </li> */}

                <li className="nav-item">
                  <Link to="/conciertos" className="nav-link nav-link-categorias active" aria-current="page" href="#">
                    <i className="fa-solid fa-microphone me-2"></i>Conciertos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/deportes" className="nav-link nav-link-categorias active" aria-current="page" href="#">
                    <i className="fa-regular fa-futbol me-2"></i>Deportes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/entretenimiento" className="nav-link nav-link-categorias active" aria-current="page" href="#">
                    <i className="fa-solid fa-film me-2"></i>Entretenimiento
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/cursos" className="nav-link nav-link-categorias active" aria-current="page" href="#">
                    <i className="fa-solid fa-book me-2"></i>Cursos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Botones de inicio de sesión/registro o perfil */}
            <div className="col-12 col-lg-3 d-flex justify-content-end">
              <ul className="navbar-nav mb-2 mb-lg-0">
                {!currentUser && !admin ? (
                  <>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">
                        <button className=" btn-outline-custom">Iniciar Sesión</button>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/registro" className="nav-link">
                        <button className=" btn-outline-custom2">Registrarse</button>
                      </Link>
                    </li>
                  </>
                ) : (
                  <div className="d-flex flex-row align-items-center gap-3">
                    {currentUser && (
                      <li className="nav-item">
                        <Link to="/user" className="nav-link">
                          <button className="btn btn-outline-info">Mi Perfil</button>
                        </Link>
                      </li>
                    )}
                    <div>
                      <li className="nav-item">
                        <Link to="/">
                          <button className="btn btn-outline-danger" onClick={handleLogout}>
                            Cerrar Sesión
                          </button>
                        </Link>
                      </li>
                    </div>
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
