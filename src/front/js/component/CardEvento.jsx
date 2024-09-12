import React from "react";

export const CardEvento = () => {
    return (
        <div className="col">
            <div className="card">
                <img src="https://picsum.photos/300/200/" className="card-img-top" alt="Evento 1" />
                <div className="card-body">
                    <h5 className="card-title text-primary fs-4">TALLER NEGOCIOS DIGITALES </h5>
                    <div className="d-flex justify-content-between">
                        <i class="fa-solid fa-location-dot fs-5"></i>
                        <p className="fs-5"> Av. Javier Prado #1050, San Borja</p>
                        <button className="btn btn-outline-warning"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                    </div>
                    <p className="fs-5"><i class="fa-regular fa-calendar"></i> 28 de setiembre</p>
                </div>
                <div className="mb-5 d-flex justify-content-around">
                    <h3>s/20</h3>

                    <button className="btn boton-verde rounded-pill fs-5 fw-bold">Ver detalles</button>
                </div>
            </div>
        </div>
    );
};
