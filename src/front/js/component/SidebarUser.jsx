import React, { useState } from 'react';
import "../../styles/SideBar.css";

const SidebarUser = ({ onViewChange }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <aside id="sidebar" className={`sidebar ${isExpanded ? 'expand' : ''}`}>
            <div className="d-flex">
                <button className="toggle-btn" type="button" onClick={toggleSidebar}>
                    <i className="fa fa-bars"></i>
                </button>
                <div className="sidebar-logo">
                    <a className="sidebar-logo" href="#">Eventicket</a>
                </div>
            </div>
            <hr className='text-white' />
            <ul className="sidebar-nav">
                <li className="sidebar-item">
                    <a className="sidebar-link btn-sidebar" onClick={() => onViewChange('profile')}>
                        <i className="fa fa-user"></i>
                        <span className='span-sidebar-user'>Mi Perfil</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link btn-sidebar" onClick={() => onViewChange('compras')}>
                        <i className="fa fa-shopping-bag"></i>
                        <span className='span-sidebar-user'>Mis compras</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link btn-sidebar" onClick={() => onViewChange('favoritos')}>
                        <i className="fa fa-heart"></i>
                        <span className='span-sidebar-user'>Mis Favoritos</span>
                    </a>
                </li>
            </ul>
            <hr className='text-white' />
        </aside>
    );
};

export default SidebarUser;