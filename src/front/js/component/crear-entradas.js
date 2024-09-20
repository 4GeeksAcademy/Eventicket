import React, { useState } from "react";
import RenderPaypal from "../component/RenderPaypal.jsx";
import '../../styles/creacion-entradas.css';

export const CrearEntradas = () => {
  const [vipTickets, setVipTickets] = useState(0);
  const [generalTickets, setGeneralTickets] = useState(0);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");

  const totalAmount = vipTickets * 100 + generalTickets * 50; // Ejemplo de precios





  return (
    <div className="bg-dark container-fluid contenedor-principal my-5">
      {/* Sección de tickets */}
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12 contenedor-izquierdo">
          <div className="p-4 rounded shadow-sm contenedor-izquierdo-hijo">
            <h2 className="text-start mb-4 titulo-entrada">GENERAR COMPRA</h2>
            <h4 className="mb-4 subtitulo">Cantidad de Tickets</h4>

            <div className="row align-items-center mb-3">
              <div className="col-6 text-light"><i className="icono-usuario fa-solid fa-user me-2"></i>ASIENTO VIP</div>
              <div className="col-6">
                <div className="input-group">
                  <button
                    className="btn btn-outline-info boton-menos rounded-circle"
                    onClick={() => setVipTickets(Math.max(0, vipTickets - 1))}
                  >
                    <i className="fa-solid fa-minus "></i>
                  </button>
                  <input
                    className="col-2 text-center text-light bg-input-entradas"
                    value={vipTickets}
                    readOnly
                  />
                  <button
                    className="btn btn-outline-info boton-mas rounded-circle"
                    onClick={() => setVipTickets(vipTickets + 1)}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="row align-items-center mb-5">
              <div className="col-6 text-light"><i className="icono-usuario fa-regular fa-user me-2"></i>GENERAL</div>
              <div className="col-6">
                <div className="input-group">
                  <button
                    className="btn btn-outline-info boton-menos rounded-circle"
                    onClick={() => setGeneralTickets(Math.max(0, generalTickets - 1))}
                  >
                    <i className="fa-solid fa-minus "></i>
                  </button>
                  <input
                    className="col-2 text-center text-light bg-input-entradas"
                    value={generalTickets}
                    readOnly
                  />
                  <button
                    className="btn btn-outline-info boton-mas rounded-circle"
                    onClick={() => setGeneralTickets(generalTickets + 1)}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Datos del comprador */}
            <form className="formulario-entradas mt-5">
              <h4 className="mb-4 subtitulo">Datos del comprador</h4>
              <div className="form-group mb-3 input-container-entrada">
                <input
                  id="nombre-entrada"
                  required
                  spellCheck="false"
                  type="text"
                  className=""
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                />
                <label className="text-light" htmlFor="nombre-entrada">Nombre</label>
              </div>

              <div className="form-group mb-3 input-container-entrada2">
                <input
                  id="email-entrada"
                  required
                  spellCheck="false"
                  type="email"
                  className=""
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                />
                <label htmlFor="email-entrada" className="text-light">Email</label>
              </div>
            </form>
          </div>
        </div>

        {/* Resumen de compra */}
        <div className="col-lg-8 col-md-6 col-sm-12 contenedor-derecho">
          <div className="bg-dark p-4 rounded shadow-sm">
            <h4 className="mb-4 nombre-evento">LIMA CITY TOUR</h4>
            <div className="row d-flex justify-content-between mb-3">
              <img className="col-lg-8 col-md-6 col-sm-12 img-evento-entrada" src="https://perutravelexpress.com/wp-content/uploads/2019/06/LIMA-MILENARIA-750x410.jpg" alt="Evento"></img>
              <div className="col-lg-4 col-md-6 col-sm-12 d-flex flex-column">
                <span className="nombre-entradas">Entradas</span> 
                <p className="text-light text-center">
                  {vipTickets} VIP <span className="barra mx-3">|</span> {generalTickets} General
                </p>
                <div className="text-light"><i className="icono-usuario fa-regular fa-newspaper me-2"></i>Vive un día diferente, recorriendo las calles de Lima de una manera distinta, apreciando su hermosura, leyenda, anécdota y viviendo una historia de antaño.</div>
                <div className="text-light"><i className="icono-usuario fa-regular fa-calendar me-2"></i>28/08/2024, 15:00hrs</div>
                <div className="text-light"><i className="icono-usuario fa-solid fa-location-dot me-2"></i>Lima, Perú</div>
                <div className="text-light"><i className="icono-usuario fa-solid fa-phone me-1"></i>+51 918 312 983</div>
              </div>
            </div>
            <small className="text-5 text-light"> * Apto para el publico en general </small>
            <hr className="text-light mb-2" />
            <div className="d-flex justify-content-between">
              <strong className="text-light mb-4 nombre-precio-total">Total a Pagar:</strong>
              <strong className="text-light nombre-precio-total">S/ {totalAmount.toFixed(2)}</strong>
            </div>
            {/* <button className="btn btn-primary w-100 mt-3">
              Comprar ahora
            </button> */}
            <RenderPaypal/>
          </div>
        </div>
      </div>
      {/* <button className="mt-4 button-personalisable">Botón mágico</button> */}
    </div>
  );
};
