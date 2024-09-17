import React, { useState, useContext } from "react";
import { Context } from "../store/appContext"
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/logito.png";
import people from "../../img/people.png";
import fondo from "../../img/fondo.png";
import "../../styles/login.css";

export const LoginAdmin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { store, actions } = useContext(Context); // Accede al store y actions desde el contexto
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el recargo de página

        const success = await actions.loginAdmin(email, password); // Llama a la acción de loginAdmin

        if (success) {
            navigate("/demo"); // Redirige al dashboard del admin
        } else {
            // Puedes mostrar el error almacenado en store.adminError
            console.log(store.adminError);
        }
    };

    return (
        <div style={{
            backgroundImage: `url(${fondo})`, backgroundColor: "#4038E6", height: "100vh", backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className="container w-75 mt-5 shadow">
                <div className="row align-items-stretch">
                    <div className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded" style={{ backgroundImage: `url(${people})`, height: "80vh" }}>
                    </div>

                    <div className="col bg-white p-5 rounded-end">
                        <div className="text-end">
                            <img src={logo} className="rounded-pill" width="40" alt="" />
                        </div>

                        <h2 className="fw-bold text-center py-3 text-primary text-info-emphasis fw-light display-6">
                            Bienvenido Administrador!
                        </h2>

                        {/* Mostrar mensaje de error si hay */}
                        {store.adminError && <div className="alert alert-danger">{store.adminError}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};