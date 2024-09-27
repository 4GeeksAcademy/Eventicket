import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Swal from "sweetalert2"; 
import '../../styles/creacion-evento.css';
import { useParams, useNavigate } from "react-router-dom";

const EditarEvento = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        category: "Seleccionar categoría",
        stock: "",
        description: "",
        image_url: "",
        date: "",
        price: "0",
        time: "",
        administrator_id:store.admin.id
    });
    const preset_name = "yu1h90st";  // Nombre del preset de carga
    const cloud_name = "drlqmol4c";  // Nombre del cloud en Cloudinary
    const [image, setImage] = useState('');  // Estado para guardar la URL de la imagen subida
    const [loading, setLoading] = useState(false);  // Estado para mostrar si la imagen está cargando

    useEffect(() => {
        if(id){
        const fetchEvent = async () => {
            const event = await actions.getEventById(id); 
            if (event) {
                setFormData({
                    ...event,
                    category: event.category || "Seleccionar categoría"
                });
            }
        };
        fetchEvent();
        }
    }, [id]);

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
            Swal.fire({
                icon: 'success',
                title: 'Imagen subida correctamente',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Error al subir la imagen',
                text: error.message,
            });
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.location || !formData.category || !formData.date || !formData.image_url) {
            Swal.fire({
                icon: 'warning',
                title: 'Por favor completa todos los campos obligatorios, incluyendo la imagen.',
            });
            return;
        }

        if (formData.category === "Seleccionar categoría") {
            Swal.fire({
                icon: 'warning',
                title: 'Por favor selecciona una categoría válida.',
            });
            return;
        }

        try {
            const result = await actions.updateEvent(id, formData);

            if (result) {
                Swal.fire({
                    icon: 'success',
                    title:result,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/demo");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al actualizar el evento',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `Error: ${error.message}`,
            });
        }
    };
 //hola
    return (
        <div className="row w-100" style={{ maxWidth: "1200px" }}>
            <p className="title-create-event d-flex flex-row ms-5 mb-0 my-2">EDITAR EVENTO</p>

            <form className="col-12 d-flex flex-wrap justify-content-between align-items-start" onSubmit={handleSubmit}>
                <div className="col-12 col-md-6 d-flex flex-column justify-content-start align-items-center">
                   
                    <div className="w-100 px-3">
                        <div className="input-container mb-3">
                            <input
                                id="event-name"
                                required
                                spellCheck="false"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className=""
                            />
                            <label htmlFor="event-name" className="form-label">Nombre</label>
                        </div>
                        <div className="input-container2 mb-3">
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
                            <label htmlFor="exampleInputPlace" className="">Lugar</label>
                        </div>
                        <div className="row d-flex justify-content-between">
                            <div className="col-7 input-container-fh mb-3">
                                <input
                                    required
                                    spellCheck="true"
                                    id="date-event"
                                    name="date"
                                    type="date"
                                    className=""
                                    min={"2024-09-14"}
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                                <p className="form-label">Fecha</p>
                            </div>
                            <div className="col-5 input-container-fh mb-3">
                                <input
                                    required
                                    id="time-event"
                                    name="time"
                                    type="time"
                                    className=""
                                    value={formData.time}
                                    onChange={handleChange} />
                                <p className="form-label">Hora</p>
                            </div>
                        </div>
                        <div className=" input-container-p mb-3">
                            <select
                                required
                                className="col-12 form-select-edit form-select-lg py-2 px-3"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                aria-label="Large select example"
                            >
                                <option value="Seleccionar categoría">Seleccionar categoría</option>
                                <option value="Conciertos">Conciertos</option>
                                <option value="Deportes">Deportes</option>
                                <option value="Entretenimiento">Entretenimiento</option>
                                <option value="Cursos">Cursos</option>
                            </select>
                            <p className="mb-2">Categorías</p>
                        </div>
                        <div className="row d-flex justify-content-between">
                            <div className="col-6 input-container-cp">
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    className="w-100 mb-3 inpunt-number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    id="exampleInputStock"
                                    aria-describedby="stockHelp"
                                    step="1"
                                />
                                <p className="mb-2">Cantidad</p>
                            </div>

                            <div className="col-6 input-container-cp">
                                <input
                                    required
                                    type="number"
                                    min="0"
                                    className="w-100 mb-3 inpunt-number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    id="exampleInputPrice"
                                    aria-describedby="stockHelp"
                                    step="1"
                                />
                                <p className="mb-2">Precio</p>
                            </div>
                        </div>
                        <div className="form-floating mb-3 input-container-t">
                            <textarea
                                required
                                spellCheck="false"
                                className="form-control-edit"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                id="floatingEvento"
                                style={{ height: "120px" }}
                            ></textarea>
                            <p className="mb-2">Descripción</p>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <div className="px-3 py-3 container-select mb-3">
                        <p>Imagen del evento</p>
                        <input
                            type="file"
                            name="file"
                            placeholder='Sube una imagen'
                            onChange={(e) => uploadImage(e)}
                            className="inpunt-img"
                        />
                        <div className="d-flex flex-column align-items-center justify-content-center h-100 bg-dark">
                            {loading ? (
                                <h3 className="text-light">Cargando...</h3>
                            ) : (
                                <img
                                    src={image ? image : formData.image_url || "https://previews.123rf.com/images/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016/167492439-sin-imagen-disponible-icono-de-imagen-predeterminada-del-vector-marca-gr%C3%A1fica.jpg"}
                                    className="h-100 w-100 object-fit-contain" alt="imagen del evento"
                                />
                            )}
                        </div>
                    </div>

                    <button type="submit" className="btn-crear-evento my-3">EDITAR EVENTO</button>
                </div>
            </form>
        </div>
    );
};

export default EditarEvento;
