import React from "react";
import logo from "../../img/logito.png";
import "../../styles/recuperarContraseña.css";
import { Link, useNavigate } from "react-router-dom";

export const RestablecerContraseña = () => {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-4">
                <form className="p-4  rounded shadow w-100" style={{ maxWidth: "400px" }}>
                    <div className="text-center">
                        <img className="mb-4" src={logo} alt="Logo" width="40" height="40" />
                        <h1 className="h3 mb-3 fw-normal">Restablecer Contraseña</h1>
                    </div>

                    <div className="form-floating mb-4">
                        <input
                            type="password"
                            className="form-control border border-primary"
                            id="password"
                            placeholder=""
                            required

                        />
                        <label htmlFor="password">Contraseña</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input
                            type="password"
                            className="form-control border border-primary"
                            id="password2"
                            placeholder=""
                            required
                        />
                        <label htmlFor="password2">Confirmar Contraseña</label>
                    </div>
                    <button className="btn btn-primary  w-100 py-2 button-restablecer " type="submit">Enviar</button>
                    <br />
                    <br />
                </form>
            </div>
        </div>
    );
};