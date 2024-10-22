import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/SideBar.css";
import '../../styles/navbar.css';

const Sidebar = ({ onViewChange }) => {
  const { store, actions } = useContext(Context);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside id="sidebar" className={`sidebar ${isExpanded ? 'expand' : ''}`}>
      <div className="d-flex align-items-center">
        <button className="toggle-btn" type="button" onClick={toggleSidebar}>
          <i className="fa fa-bars"></i>
        </button>
        <div className="sidebar-logo">
          <span className="span-sidebar-user text-white fs-5">Dashboard</span>
        </div>
      </div>
      <hr className='text-white' />
      <div className="d-flex flex-column align-items-center mb-3">
        <span className="span-sidebar-user text-white">{store.admin ? store.admin.name : "Admin"}</span>
      </div>
      <ul className="sidebar-nav">
        <li className="sidebar-item">
          <a className="sidebar-link btn-sidebar nav-link-categorias  active" onClick={() => onViewChange('users')}>
            <i className="fa fa-user"></i>
            <span className='span-sidebar-user'>Usuarios</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a className="sidebar-link btn-sidebar nav-link-categorias  active" onClick={() => onViewChange('events')}>
            <i className="fa fa-shopping-bag"></i>
            <span className='span-sidebar-user'>Eventos</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a className="sidebar-link btn-sidebar nav-link-categorias  active" onClick={() => onViewChange('create')}>
            <i className="fa-solid fa-calendar-days"></i>
            <span className='span-sidebar-user'>Crear evento</span>
          </a>
        </li>
      </ul>
      <hr className='text-white' />
    </aside>
  );
};

export default Sidebar;