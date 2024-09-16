import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { Context } from "../store/appContext";
import '../../styles/creacion-evento.css';

export const VistaEvento = () => {
    // const { store, actions } = useContext(Context);
    return (
        <div className="crear-eventos d-flex justify-content-center align-items-center vh-100">
            <div className="row w-100" style={{ maxWidth: "1200px" }}>
                <div className="col-12 text-center mb-4">
                    <p className="titulo" >L<span>ista de eventos</span></p>
                </div>

                <div className="col-12 col-md-6 d-flex justify-content-center">
                    <form className="w-100 px-3">
                        <div className="mb-3 input-container">
                            <input required spellCheck="false" type="text" className="" id="exampleInputName" aria-describedby="nameHelp" />
                            <label htmlFor="exampleInputName" className="form-label">Nombre</label>
                        </div>
                        <div className="mb-3 input-container2">
                            <input required spellCheck="false" type="text" className="" id="exampleInputPlace" aria-describedby="lugarHelp" />
                            <label htmlFor="exampleInputPlace" className="form-label">Lugar</label>
                        </div>
                        <div className="mb-3 container-select">
                            <br></br>
                            <p>Categorías</p>
                            <select className="form-select-edit form-select-lg mb-3" aria-label="Large select example">
                                <option selected>Seleccionar categoría</option>
                                <option value="1">Conciertos</option>
                                <option value="2">Deportes</option>
                                <option value="3">Entretenimiento</option>
                                <option value="4">Cursos</option>
                            </select>
                        

                        </div>
                        <div className="mb-3 input-container">
                            <input type="number" className="form-control" id="exampleInputStock" aria-describedby="stockHelp" />
                            <label htmlFor="exampleInputStock" className="form-label">Stock</label>
                        </div>
                        <div className="form-floating mb-3 input-container2">
                            <textarea required spellCheck="false" className="form-control-edit" placeholder="Descripción del evento ..." id="floatingEvento" style={{ height: "100px" }}></textarea>
                            {/* <label htmlFor="floatingTextarea2">Descripción del evento</label> */}
                        </div>
                        <button type="submit" className="btn btn-primary button-add-event w-100">Agregar</button>
                    </form>
                </div>

                <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">
                    
                    <div className="container-img-event my-5">
                        <p className="p-img-event">Imagen del evento</p>
                        <img className="img-evento" src="https://www.miraflores.gob.pe/wp-content/uploads/2023/11/Web-3.jpg"></img>
                    </div>
                    <div className="px-3 input-container">
                        <input id="date-event" type="datetime-local" className="form-control mt-3 input-container" min={"2024-09-14"} />
                        <label htmlFor="date-event" className="form-label">Fecha</label>
                    </div>
                </div>
            </div>
        </div>
    )
}
