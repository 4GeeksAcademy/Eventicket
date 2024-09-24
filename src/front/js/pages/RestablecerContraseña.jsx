import React, { useContext, useEffect, useState } from "react";
import logo from "../../img/logito.png";
import "../../styles/recuperarContraseña.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Context } from "../store/appContext";
import Swal from 'sweetalert2';

export const RestablecerContraseña = () => {
    const {actions}=useContext(Context)
    const [formPass,setFormPass]=useState({
        new_password:"",
        verifiedPassword:""
    })
    const [isToken,setToken]=useState(false)
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get('token')
    const navigate=useNavigate()

    const handleInput=(e)=>{
        setFormPass({...formPass,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        if(!token){setToken(false)}
        else{setToken(true)}
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            Swal.fire({
                title: 'Error',
                text: 'Token no existente',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
        if (formPass.new_password !== formPass.verifiedPassword) {
            Swal.fire({
                title: 'Error',
                text: 'Las Contraseñas en ambos campos deben ser iguales',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return; 
        }

        const response = await actions.changepass(token, formPass.new_password);
        console.log(response);
        await Swal.fire({
            title: 'Éxito',
            text: 'Contraseña restablecida con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
        return navigate("/Login");
    }



    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
           {token? <div className="col-12 col-md-8 col-lg-6 col-xl-4">
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
                            name="new_password"
                            value={formPass.new_password}
                            onChange={handleInput}
                            required

                        />
                        <label htmlFor="password">Contraseña</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input
                            type="password"
                            className="form-control border border-primary"
                            id="password2"
                            name="verifiedPassword"
                            placeholder=""
                            value={formPass.verifiedPassword}
                            onChange={handleInput}
                            required
                        />
                        <label htmlFor="password2">Confirmar Contraseña</label>
                    </div>
                    <button className="btn btn-primary  w-100 py-2 button-restablecer " type="submit"
                    onClick={handleSubmit}
                    >Enviar</button>
                    <br />
                    <br />
                </form>
            </div>:<div>No estas autorizado para ingresar a esta pagina</div>}
        </div>
    );
}