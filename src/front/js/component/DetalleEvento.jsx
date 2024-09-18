import React from "react";
import "../../styles/detalleEvento.css";

export const DetalleEvento = () => {

    return (
        <div className="container">
            <h1 className="text-center display-1 text-info-emphasis text-primary fw-semibold">Ópera Tosca </h1>
            <div className="d-flex justify-content-start">
                <p className="text-center text-secondary me-3"><i className="fas fa-map-marker-alt text-primary"></i> jr.Ica 377 Cercado de Lima, Teatro Municipal de Lima </p>
                <p className="text-center text-secondary p"><i className="fa fa-check-square text-primary" aria-hidden="true"></i> Evento Cultural </p>
            </div>

            <div className="row">
                {/* <!-- Galería de imágenes y descripción --> */}
                <div className="col-lg-6 rounded">
                    <div className="carousel slide mb-5" id="carouselDemo" data-bs-wrap="true">

                        <div className="carousel-inner">

                            <div className="carousel-item active">
                                <img src="https://i0.wp.com/iopera.es/wp-content/uploads/2018/10/Tosca-de-Puccini-desde-Helsinki-desde-la-%C3%93pera-Nacional-de-Finlandia-v%C3%ADdeo-de-la-%C3%B3pera-en-la-representaci%C3%B3n-en-directo-del-7-de-octubre-de-2018-giacomo.jpg?fit=901%2C585"
                                    className="w-100" />
                            </div>

                            <div className="carousel-item " data-bs-interval="2000">
                                <img src="https://oldbcn.com/images/agenda/musica/tosca.jpg" className="w-100" />

                            </div>

                            <div className="carousel-item ">
                                <img src="https://www.operaworld.es/wp-content/uploads/2023/02/Captura-de-Pantalla-2023-02-27-a-las-22.56.56.png"
                                    className="w-100" />
                            </div>
                        </div>

                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselDemo"
                            data-bs-slide="prev">
                            <span className="carousel-control-prev-icon green"></span>
                        </button>

                        <button className="carousel-control-next" type="button" data-bs-target="#carouselDemo"
                            data-bs-slide="next">
                            <span className="carousel-control-next-icon green"></span>
                        </button>

                        <div className="carousel-indicators spacing">
                            <button type="button" className="active" data-bs-target="#carouselDemo" data-bs-slide-to="0">
                                <img
                                    src="https://i0.wp.com/iopera.es/wp-content/uploads/2018/10/Tosca-de-Puccini-desde-Helsinki-desde-la-%C3%93pera-Nacional-de-Finlandia-v%C3%ADdeo-de-la-%C3%B3pera-en-la-representaci%C3%B3n-en-directo-del-7-de-octubre-de-2018-giacomo.jpg?fit=901%2C585" />
                            </button>

                            <button type="button" data-bs-target="#carouselDemo" data-bs-slide-to="1">
                                <img src="https://oldbcn.com/images/agenda/musica/tosca.jpg" />
                            </button>

                            <button type="button" data-bs-target="#carouselDemo" data-bs-slide-to="2">
                                <img
                                    src="https://www.operaworld.es/wp-content/uploads/2023/02/Captura-de-Pantalla-2023-02-27-a-las-22.56.56.png" />
                            </button>
                        </div>

                    </div>
                    <div className="envento-info mt-4 pt-5 ">
                        <h3 className="text-info-emphasis text-primary"> Descripción</h3>
                        <p >
                            En conmemoración por los 100 años del fallecimiento del gran compositor italiano, Giacomo
                            Puccini, la Municipalidad Metropolitana de Lima presenta Tosca, ópera en tres actos, con música
                            de Giacomo Puccini y libreto en italiano de Luigi Illica y Giuseppe Giacosa. Combinando amor,
                            intriga, violencia, pasión y muerte, en una fascinante historia que contará con la participación
                            de la soprano Diana Lamar, como Floria Tosca, el tenor Enrique Folger, en el papel de Mario
                            Cavaradossi y el barítono Fabián Veloz, como el Barón Scarpia.
                        </p>
                    </div>
                </div>

                <div className="col-lg-6 rounded">
                    {/* <!-- Sección de compra --> */}
                    <div className="buy-section">
                        <h3>Tosca</h3>
                        <hr />
                        <p className="fw-bold fs-4">Precio: <strong className="text-info-emphasis text-danger precio">S/.50.00</strong></p>
                        {/* <!-- Selector de fecha --> */}
                        <div className="d-flex align-items-center">
                            <label htmlFor="date" className="fw-bold"> <i className="fas fa-calendar-alt calendar-icon"></i> Fecha:</label>
                            <select id="date" className="htmlForm-select w-50 rounded height-input" defaultValue="">
                                <option disabled value="">Selecciona una fecha</option>
                                <option>2024-09-20</option>
                                <option>2024-09-21</option>
                                <option>2024-09-22</option>
                            </select>
                        </div>

                        {/* <!-- Horario --> */}
                        <div className="d-flex align-items-center mt-3">
                            <label htmlFor="horario" className="fw-bold"><i className="fas fa-clock time-icon"></i> Horario :</label>
                            <select className="htmlForm-select w-50 rounded height-input" id="horario" defaultValue="">
                                <option disabled value="">Selecciona Horario</option>
                                <option>17:00 PM</option>
                                <option>19:00 PM</option>
                                <option>21:00 PM</option>
                            </select>
                        </div>

                        {/* <!-- Disponibilidad --> */}
                        <div className="d-flex align-items-center mt-3 ">
                            <i className="fas fa-globe world-icon"></i>
                            <p className="fw-bold">Disponible en: <strong>Lima</strong></p>
                        </div>

                        {/* <!-- Disponibilidad de tickets --> */}
                        <div className="availability-section">
                            <label htmlFor="tickets" className="fw-bold">Disponibilidad:</label>
                            <input type="number" id="tickets" className="htmlForm-control w-25 rounded" min="1" max="10" defaultValue="1" />
                            <p className="text-muted">Quedan 10 tickets disponibles</p>
                        </div>

                        {/* <!-- Botón de compra --> */}
                        <button className=" boton-verde btn btn-lg w-100 mt-3 fw-bold text-primary">Comprar ahora</button>
                    </div>
                    {/* <!-- Mapa de Google --> */}
                    <div className="row mt-5">
                        <h3 className="text-info-emphasis text-primary"><i className="fas fa-map-marker-alt text-primary ubicacion-icon"></i> Ubicación del Evento</h3>
                        <div id="map">
                            {/* <!-- Google Maps incrustado --> */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.9706489516125!2d-77.03757989004369!3d-12.045540441827331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8ca3c54dd11%3A0x40b0447dcf24a5c8!2sTeatro%20Municipal%20de%20Lima!5e0!3m2!1ses!2spe!4v1726583780944!5m2!1ses!2spe"
                                width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Ubicación del evento"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};