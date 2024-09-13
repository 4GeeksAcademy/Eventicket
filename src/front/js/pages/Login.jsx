import React from "react";
import logo from "../../img/logito.png";
import people from "../../img/people.png";
import fondo from "../../img/fondo.png";
import { Link } from "react-router-dom"
import "../../styles/login.css";

export const Login = () => {
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
                    <div className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded" style={{ backgroundImage: `url(${people})`, height: "80vh", width: "100%" }}>
                    </div>

                    <div className="col bg-white p-5  rounded-end">
                        <div className="text-end">
                            <img src={logo} className="rounded-pill" width="40" alt="" />
                        </div>

                        <h2 className="fw-bold text-center py-3 text-primary text-info-emphasis fw-light display-6">
                            Bienvenidos a Eventicket
                        </h2>

                        <form action="#">

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
                                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                            </div>
                            <div className="my-3">
                                <Link to="/registro">
                                    Aún no tienes cuenta?<a href="#">Regístrate</a>
                                </Link>
                                <br />
                                <span><a href="#">Ingresar como Administrador</a></span> <br />
                                <span><a href="#">¿Olvidaste tu contraseña?</a></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};