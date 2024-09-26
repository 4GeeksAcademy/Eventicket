import React, { useContext, useEffect, useState } from 'react';
import SidebarUser from '../component/SidebarUser.jsx';
import NavbarUser from '../component/NavbarUser.jsx';
import PerfilUser from '../component/PerfilUser.jsx';
import ComprasUser from '../component/ComprasUser.jsx';
import FavoritosUser from '../component/FavoritosUser.jsx';
import { Context } from '../store/appContext.js';
import { useNavigate } from 'react-router-dom';

const DashboardUser = () => {
    const [activeView, setActiveView] = useState('profile');
    const {store}=useContext(Context)
    const navigate=useNavigate()
    const handleViewChange = (view) => {
        setActiveView(view);
    };
    
    useEffect(()=>{
        if(!store.currentUser){navigate("/")}
        if(store.admin){navigate("/demo")}
    },[store.currentUser])

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