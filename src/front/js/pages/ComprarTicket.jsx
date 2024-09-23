import React from "react";
import "../../styles/detalleEvento.css";

export const ComprarTicket = () => {

    const handleComprar = (e) => {
        e.preventDefault();
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-4">
                <div className="p-4 rounded-3 shadow w-100" style={{ maxWidth: "400px" }}>
                    <div className="text-center mb-4">
                        <h1 className="text-info-emphasis fw-semibold">RESUMEN DE LA ORDEN</h1>
                        <h2 className="text-info-emphasis text-primary fw-semibold">Ópera Tosca</h2>
                    </div>

                    {/* Fecha */}
                    <div className="row mb-3 border-bottom border-primary pb-2">
                        <div className="col-6 col-md-4 fw-bold">Fecha</div>
                        <div className="col-6 col-md-8">2024-09-14</div>
                    </div>

                    {/* Cantidad de tickets */}
                    <div className="row mb-3 border-bottom border-primary pb-2">
                        <div className="col-6 col-md-4 fw-bold">Cantidad</div>
                        <div className="col-6 col-md-8">2 </div>
                    </div>

                    {/* Precio del ticket */}
                    <div className="row mb-3 border-bottom border-primary pb-2">
                        <div className="col-6 col-md-4 fw-bold">Precio</div>
                        <div className="col-6 col-md-8">50 soles</div>
                    </div>

                    {/* Precio total */}
                    <div className="row mb-3 border-bottom border-primary pb-2">
                        <div className="col-6 col-md-4 fw-bold">Total</div>
                        <div className="col-6 col-md-8">100 soles</div>
                    </div>

                    <button className="btn boton-verde w-100 py-2 rounded-pill fw-bold text-white" onClick={handleComprar}>
                        Continuar Compra
                    </button>
                </div>
            </div>
        </div>
    );
};