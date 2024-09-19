import React, { useState } from 'react';
import SidebarUser from '../component/SidebarUser.jsx';
import NavbarUser from '../component/NavbarUser.jsx';
import PerfilUser from '../component/PerfilUser.jsx';
import ComprasUser from '../component/ComprasUser.jsx';
import FavoritosUser from '../component/FavoritosUser.jsx';

const DashboardUser = () => {
    const [activeView, setActiveView] = useState('profile'); // Estado por defecto: 'profile'

    const handleViewChange = (view) => {
        setActiveView(view);
    };

    return (
        <div className="wrapper">
            <SidebarUser onViewChange={handleViewChange} />
            <div className="main p-3">
                <NavbarUser />
                <div className="shadow p-3 mb-5 bg-body-tertiary rounded">

                    {activeView === 'profile' && <PerfilUser />}
                    {activeView === 'compras' && <ComprasUser />}
                    {activeView === 'favoritos' && <FavoritosUser />}
                </div>
            </div>
        </div>
    );
};

export default DashboardUser;