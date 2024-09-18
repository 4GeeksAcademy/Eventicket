import React, { useContext, useState } from "react";
import logito from "../../img/logito.png";
import fondo from "../../img/fondo.png";
import registro from "../../img/Registro.png";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Registro = () => {

    const { actions } = useContext(Context); // Acceder a las acciones del flux
    const navigate = useNavigate(); // Para redirigir después del registro
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        email: "",
        password: "",
    });

    // Manejar el cambio de los inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.createUser(formData);
        if (success) {
            alert("Usuario creado exitosamente");
            navigate("/login"); // Redirigir a la página de login después del registro exitoso
        } else {
            alert("Error al crear el usuario");
        }
    };

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
                        height: "90vh",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}>

                    </div>

                    <div className="col bg-white p-5 rounded-end">
                        <div className="text-end">
                            <img src={logito} className="rounded-pill" width="45" alt="" />
                        </div>

                        <h2 className="fw-bold text-center py-3 text-primary text-info-emphasis fw-light display-6">
                            Regístrate
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="d-flex justify-content-between">
                                <div className="mb-4">
                                    <label htmlFor="name" className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="last_name" className="form-label">Apellidos</label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        className="form-control"
                                        value={formData.last_name}
                                        onChange={handleChange}
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
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Registrate
                                </button>
                            </div>
                            <div className="my-3">
                                <Link to="/login">
                                    Ya tienes cuenta? Ingresa aqui.
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >

    );
};