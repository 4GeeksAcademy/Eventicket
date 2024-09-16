import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { Context } from "../store/appContext";
import '../../styles/creacion-evento.css';

export const VistaEvento = () => {
    // const { store, actions } = useContext(Context);
    return (
        <div className="crear-eventos d-flex justify-content-center align-items-center vh-100">
            <div className="d-flex flex-column vh-100 p-3 bg-dark text-white">
                <div className="d-flex flex-column align-items-center mb-3">
                    <h5>Pepito Juanjo</h5>
                    <span className="text-success">Admin</span>
                </div>
                <nav className="nav flex-column">
                    <button
                        className="btn btn-link text-white"
                        onClick={() => setActiveList("events")}
                    >
                        Lista Eventos
                    </button>
                    <button
                        className="btn btn-link text-white"
                        onClick={() => setActiveList("users")}
                    >
                        Lista Usuarios
                    </button>
                </nav>
            </div>

            <div className="row w-100" style={{ maxWidth: "1200px" }}>

                {/* <div className="col-12 text-start mb-4 ms-4">
                    <p className="titulo">L<span>ista de eventos</span></p>
                </div> */}

                {/* Estructura de dos columnas dentro del formulario */}
                <form className="col-12 d-flex justify-content-between align-items-start">

                    {/* Columna de la izquierda: Nombre, lugar, categorías, stock y descripción */}
                    <div className="col-12 col-md-6 d-flex flex-column justify-content-start align-items-center">
                        <div className="w-100 px-3">
                            <div className="mb-3 input-container">
                                <input required spellCheck="false" type="text" className="" id="exampleInputName" aria-describedby="nameHelp" />
                                <label htmlFor="exampleInputName" className="form-label">Nombre</label>
                            </div>
                            <div className="mb-3 input-container2">
                                <input required spellCheck="false" type="text" className="" id="exampleInputPlace" aria-describedby="lugarHelp" />
                                <label htmlFor="exampleInputPlace" className="form-label">Lugar</label>
                            </div>
                            <div className="mb-3 container-select p-3">
                                <p>Categorías</p>
                                <select required className="form-control form-select-edit form-select-lg mb-3" aria-label="Large select example">
                                    <option selected>Seleccionar categoría</option>
                                    <option value="1">Conciertos</option>
                                    <option value="2">Deportes</option>
                                    <option value="3">Entretenimiento</option>
                                    <option value="4">Cursos</option>
                                </select>
                            </div>
                            <div className="mb-3 container-select">
                                <input required type="number" className="form-control" id="exampleInputStock" aria-describedby="stockHelp" />
                                <p>Stock</p>
                            </div>
                            <div className="form-floating mb-3 input-container2">
                                <textarea required spellCheck="false" className="form-control-edit" placeholder="Descripción del evento ..." id="floatingEvento" style={{ height: "100px" }}></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Columna de la derecha: Imagen y Fecha */}
                    <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">
                        <div className="container-img-event mb-4">
                            <p className="p-img-event">Imagen del evento</p>
                            <img className="img-evento" src="https://www.miraflores.gob.pe/wp-content/uploads/2023/11/Web-3.jpg" alt="evento" />
                        </div>
                        <div className="px-3 py-3 container-select">
                            <input required id="date-event" type="datetime-local" className="form-control input-container" min={"2024-09-14"} />
                            <p className="form-label">Fecha</p>
                        </div>
                        <br></br>
                        {/* Botón "Agregar" centrado debajo del formulario */}
                        <button type="submit" className="btn btn-primary button-add-event">Agregar evento</button>

                    </div>

                </form>

                {/* <div className="col-12 d-flex justify-content-center mt-4">
                </div> */}

            </div>
        </div>
    )
}
