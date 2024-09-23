import React from "react";

export const ComprarTicket = () => {

    const handleComprar = (e) => {
        e.preventDefault();

    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-4">
                <form className="p-4 rounded shadow w-100" style={{ maxWidth: "400px" }} onSubmit={handleComprar}>
                    <div className="text-center">
                        <h1 className="text-center text-info-emphasis  fw-semibold">Detalle de la compra</h1>
                        <h2 className="text-center  text-info-emphasis text-primary fw-semibold">Ópera Tosca</h2>
                    </div>

                    {/* Fecha  */}
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label fw-bold ">Fecha del Evento</label>
                        <input
                            required
                            id="date"
                            name="date"
                            type="date"
                            className="form-control input-container border-primary"
                            min={"2024-09-14"}
                        // value="fecha"

                        />
                    </div>

                    {/* Cantidad de tickets */}
                    <div className="mb-3">
                        <label htmlFor="cantidad" className="form-label fw-bold">Cantidad de Tickets</label>
                        <input
                            type="number"
                            className="form-control input-container border-primary"
                            id="cantidad"
                        // min="1"
                        // value="cantidad"
                        />
                    </div>

                    {/* Precio del ticket */}
                    <div className="mb-3">
                        <label htmlFor="precio" className="form-label fw-bold">Precio por Ticket</label>
                        <input
                            type="text"
                            className="form-control input-container border-primary"
                            id="precio"
                        // value="precio"
                        // disabled 
                        />
                    </div>

                    {/* Precio total */}
                    <div className="mb-3">
                        <label htmlFor="precioTotal" className="form-label fw-bold">Total</label>
                        <input
                            type="text"
                            className="form-control input-container border-primary"
                            id="precioTotal"
                        // value="precioTotal"
                        // disabled
                        />
                    </div>

                    <button className="btn btn-primary w-100 py-2" type="submit">
                        Comprar
                    </button>
                </form>
            </div>
        </div>
    );
};