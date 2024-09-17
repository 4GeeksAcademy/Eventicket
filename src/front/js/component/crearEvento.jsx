import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import '../../styles/creacion-evento.css';

const CrearEvento = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        name: "",
        place: "",
        category: "",
        stock: "",
        description: "",
        date: "",
        admin_id: 1  // El ID del administrador, puedes adaptarlo según tu lógica de autenticación
    });

    // Manejar los cambios en los inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica
        if (!formData.name || !formData.place || !formData.category || !formData.date) {
            alert("Por favor completa todos los campos obligatorios.");
            return;
        }

        if (formData.category === "Seleccionar categoría") {
            alert("Por favor selecciona una categoría válida.");
            return;
        }

        // Log formData to check its content
        console.log("Form Data:", formData);

        try {
            // Llamar a la acción createEvent
            const result = await actions.createEvent({
                ...formData,
                image_url: null // Por ahora omitimos la imagen, puedes dejarla en null
            });

            // Mostrar mensaje de éxito
            if (result) {
                alert("Evento creado con éxito");
            } else {
                alert("Error al crear el evento");
            }
        } catch (error) {
            // Mostrar mensaje de error
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="row w-100" style={{ maxWidth: "1200px" }}>
            <form className="col-12 d-flex justify-content-between align-items-start" onSubmit={handleSubmit}>
                <div className="col-12 col-md-6 d-flex flex-column justify-content-start align-items-center">
                    <div className="w-100 px-3">
                        <div className="mb-3 input-container">
                            <input
                                required
                                spellCheck="false"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Nombre del evento"
                            />
                        </div>
                        <div className="mb-3 input-container2">
                            <input
                                required
                                spellCheck="false"
                                type="text"
                                name="place"
                                value={formData.place}
                                onChange={handleChange}
                                id="exampleInputPlace"
                                className=""
                                aria-describedby="lugarHelp"
                            />
                            <label htmlFor="exampleInputPlace" className="form-label">Lugar</label>
                        </div>
                        <div className="mb-3 container-select p-3">
                            <p>Categorías</p>
                            <select
                                required
                                className="form-control form-select-edit form-select-lg mb-3"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                aria-label="Large select example"
                            >
                                <option defaultValue>Seleccionar categoría</option>
                                <option value="Conciertos">Conciertos</option>
                                <option value="Deportes">Deportes</option>
                                <option value="Entretenimiento">Entretenimiento</option>
                                <option value="Cursos">Cursos</option>
                            </select>
                        </div>
                        <div className="mb-3 container-select">
                            <input
                                required
                                type="number"
                                className="form-control"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                id="exampleInputStock"
                                aria-describedby="stockHelp"
                            />
                            <p>Stock</p>
                        </div>
                        <div className="form-floating mb-3 input-container2">
                            <textarea
                                required
                                spellCheck="false"
                                className="form-control-edit"
                                placeholder="Descripción del evento ..."
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                id="floatingEvento"
                                style={{ height: "100px" }}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <div className="px-3 py-3 container-select">
                        <input
                            required
                            id="date-event"
                            name="date"
                            type="datetime-local"
                            className="form-control input-container"
                            min={"2024-09-14"}
                            value={formData.date}
                            onChange={handleChange}
                        />
                        <p className="form-label">Fecha</p>
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary button-add-event">Agregar evento</button>
                </div>
            </form>
        </div>
    );
};

export default CrearEvento;
