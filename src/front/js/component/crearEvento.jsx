import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import '../../styles/creacion-evento.css';

const CrearEvento = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        category: "",
        stock:"",  // Inicializar como número
        description: "",
        image_url: "",
        date: "",
        price:"0",  // Inicializar como número
        time:"",
        administrator_id: 1
    });
    const preset_name = "yu1h90st";                         // Nombre del preset de carga
    const cloud_name = "drlqmol4c";                          // Nombre del cloud en Cloudinary
    const [image, setImage] = useState('');       // Estado para guardar la URL de la imagen subida
    const [loading, setLoading] = useState(false); // Estado para mostrar si la imagen está cargando

    // Función para subir la imagen
    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', preset_name);

        setLoading(true);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });

            const file = await response.json();
            setImage(file.secure_url);
            setFormData({
                ...formData,
                image_url: file.secure_url
            });
            setLoading(false);
            console.log("URL de la imagen subida:", file.secure_url);
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            setLoading(false);
        }
    };

    // Manejar los cambios en los inputs
    //
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        if (!formData.title || !formData.location || !formData.category || !formData.date || !formData.image_url) {
            alert("Por favor completa todos los campos obligatorios, incluyendo la imagen.");
            return;
        }

        if (formData.category === "Seleccionar categoría") {
            alert("Por favor selecciona una categoría válida.");
            return;
        }

        try {
            const result = await actions.createEvent(formData);

            if (result) {
                alert("Evento creado con éxito");
            } else {
                alert("Error al crear el evento");
            }
        } catch (error) {
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
                                name="title"
                                value={formData.title}
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
                                name="location"
                                value={formData.location}
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
                                step="1"
                            />
                            <p>Stock</p>
                        </div>

                        <div className="mb-3 container-select">
                            <input
                                required
                                type="number"
                                className="form-control"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                id="exampleInputPrice"
                                aria-describedby="stockHelp"
                                step="1"
                            />
                            <p>Price</p>
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
                            type="date"
                            className="form-control input-container"
                            min={"2024-09-14"}
                            value={formData.date}
                            onChange={handleChange}
                        />
                        <p className="form-label">Fecha</p>
                        
                        <input
                         required
                         id="time-event"
                         name="time"
                         type="time"
                          className="form-control input-container"
                         value={formData.time}
                         onChange={handleChange}/>
                        <p className="form-label">Hora</p>
                    


                        <div>
                            <h1>Subir Imagen</h1>

                            <input
                                type="file"
                                name="file"
                                placeholder='Sube una imagen'
                                onChange={(e) => uploadImage(e)}
                            />

                            <div className="d-flex flex-column align-items-center justify-content-center h-100 bg-dark">
                                {loading ? (
                                    <h3 className="text-light">Cargando...</h3>
                                ) : (
                                    <img
                                        src={image ? image : "https://previews.123rf.com/images/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016/167492439-sin-foto-o-icono-de-imagen-en-blanco-cargando-im%C3%A1genes-o-marca-de-imagen-faltante-imagen-no.jpg"}
                                        alt="imagen subida"
                                        className="img-fluid rounded shadow-lg"
                                        style={{ maxWidth: '100%', height: 'auto', maxHeight: '500px' }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary button-add-event">Agregar evento</button>
                </div>
            </form>
        </div>
    );
};

export default CrearEvento;
