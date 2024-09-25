import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { LoginAdmin } from "./pages/login-admin.jsx";
import { Conciertos } from "./pages/conciertos";
import { Deportes } from "./pages/deportes";
import { Entrenenimiento } from "./pages/entretenimiento";
import { Cursos } from "./pages/cursos";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import { Login } from "./pages/Login.jsx";
import { Registro } from "./pages/Registro.jsx";
import { DetalleEvento } from "./component/DetalleEvento.jsx";
import DashboardUser from "./pages/DashboardUser.jsx";
import { RecuperarContraseña } from "./pages/RecuperarContraseña.jsx";
import { RestablecerContraseña } from "./pages/RestablecerContraseña.jsx";
import { ComprarTicket } from "./pages/ComprarTicket.jsx";
import  EditarEvento  from "./component/editarEvento.jsx"
import Favourites from "./pages/Favourites.jsx";
import {ConfirmacionCompra}   from "./component/confirmacionCompra.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Conciertos />} path="/conciertos" />
                        <Route element={<Deportes />} path="/deportes" />
                        <Route element={<Entrenenimiento />} path="/entrenenimiento" />
                        <Route element={<Cursos />} path="/cursos" />
                        <Route element={<HomePage />} path="/homepage" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<LoginAdmin />} path="/login-admin" />
                        <Route element={<Registro />} path="/registro" />
                        <Route element={<DetalleEvento />} path="/detalle/:eventId" />
                        <Route element={<DashboardUser />} path="/user" />
                        <Route element={<RecuperarContraseña />} path="/contrasena" />
                        <Route path="/restablecer/" element={<RestablecerContraseña />}  />
                        <Route element={<EditarEvento />} path="/editarEvento/:id" />
                        <Route element={<ComprarTicket />} path="/comprar" />
                        <Route element={<Favourites />} path="/favourites" />
                        <Route element={<ConfirmacionCompra />} path="/confirmacionCompra" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
