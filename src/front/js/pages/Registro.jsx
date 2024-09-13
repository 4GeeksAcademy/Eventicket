import React from "react";
import logo from "../../img/logo.png";
import fondo from "../../img/fondo.png";
import registro from "../../img/Registro.png";
import { Link } from "react-router-dom"


export const Registro = () => {
    return (
        <div className="login-background" style={{
            backgroundImage: `url(${fondo})`,
            backgroundColor: "#4038E6",
            height: "100vh",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className="container w-75 mt-5 rounded shadow">
                <div className="row align-items-stretch">
                    <div className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded" style={{
                        backgroundImage: `url(${registro})`,
                        height: "80vh",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}>

                    </div>

                    <div className="col bg-white p-5 rounded-end">
                        <div className="text-end">
                            <img src={logo} className="rounded-pill" width="45" alt="" />
                        </div>

                        <h2 className="fw-bold text-center py-3 text-primary text-info-emphasis fw-light display-6">
                            Regístrate
                        </h2>

                        <form action="#">
                            <div className="d-flex justify-content-between">
                                <div className="mb-4">
                                    <label htmlFor="name" className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                                    <input
                                        type="text"
                                        id="apellidos"
                                        name="apellidos"
                                        className="form-control"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Registrate</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >

    );
};