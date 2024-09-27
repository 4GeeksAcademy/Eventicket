import React, { act, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/navbar.css';
import loguito2 from "../../img/logito2.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const { currentUser, admin } = store;
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredEvents = store.events?.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  const handleEventClick = () => {
    setSearchTerm("");
    setDropdownOpen(false);
  };

  useEffect(() => {
  }, [currentUser, admin]);

  return (
    <>
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
            <div className="search-container"> {/* Centro de búsqueda */}
              <form className="d-flex">

                <input
                  className="form-control input-search me-2 rounded-pill"
                  type="search"
                  placeholder="¡Entradas para tu atracción soñada!"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setDropdownOpen(true)}
                />
              </form>

              {searchTerm && filteredEvents.length > 0 && dropdownOpen && (
                <ul className="dropdown-menu show w-100 position-absolute" style={{ top: "100%", zIndex: 1000 }}>
                  {filteredEvents.map((event) => (
                    <li key={event.id}>
                      <Link to={`/detalle/${event.id}`} className="dropdown-item d-flex align-items-center" onClick={handleEventClick}>
                        <img src={event.image_url} alt={event.title} style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                        <div className="flex-grow-1">
                          <strong>{event.title}</strong>
                          <p style={{ margin: 0, fontSize: '0.9em' }}>{event.description.substring(0, 40)}...</p>
                        </div>
                        <div className="text-end">
                          <strong>${event.price}</strong>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>



            <div className="d-flex justify-content-end">
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
      </nav>
    </>
  );
};
