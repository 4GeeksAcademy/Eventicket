import React from "react";

const Sidebar = ({ setActiveList }) => {
  return (
    <div className="d-flex flex-column vh-100 p-3 bg-dark text-white">
      <div className="d-flex flex-column align-items-center mb-3">
        <h5>Pepito Juanjo</h5>
        <span className="text-success">Admin</span>
      </div>
      <nav className="nav flex-column">
        <button
          className="btn btn-link text-white"
          onClick={() => setActiveList("events")}
        >
          Lista Eventos
        </button>
        <button
          className="btn btn-link text-white"
          onClick={() => setActiveList("users")}
        >
          Lista Usuarios
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
