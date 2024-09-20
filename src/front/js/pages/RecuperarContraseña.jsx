import React from "react";
import logo from "../../img/logito.png";
import "../../styles/recuperarContraseña.css";
import { Link, useNavigate } from "react-router-dom";

export const RecuperarContraseña = () => {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-4 ">
                <form className="p-4  rounded shadow w-100" style={{ maxWidth: "400px" }}>
                    <div className="text-center">
                        <img className="mb-4" src={logo} alt="Logo" width="40" height="40" />
                        <h1 className="h3 mb-3 fw-normal">¿Olvidaste tu contraseña?</h1>
                        <p className=" text-center fw-bold">No te preocupes!😊</p>
                        <p>Te enviaremos un enlace por correo electrónico para que puedas restablecer tu contraseña</p>
                    </div>

                    <div className="form-floating mb-4">
                        <input
                            type="email"
                            className="form-control border border-primary"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Correo Electrónico</label>
                    </div>
                    <Link to="/restablecer">
                        <button className="btn btn-primary  w-100 py-2 button-restablecer " type="submit">Restablecer Contraseña</button>
                    </Link>
                    <br />
                    <br />
                    <p className=" text-center fw-bold"  >o{""} <Link to="/login">Iniciar sesión</Link> </p>
                    <br />
                </form>
            </div>
        </div>
    );
};