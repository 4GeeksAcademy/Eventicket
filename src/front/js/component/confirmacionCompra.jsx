import React from "react";
import { Link } from "react-router-dom";
import '../../styles/confirmacion-compra.css';
import { useLocation } from "react-router-dom";

export const ConfirmacionCompra = () => {
  const location = useLocation();
  const {
    eventName,
    eventLocation,
    eventTime,
    eventDate,
    quantity,
    totalAmount,
  } = location.state || {};

  return (
    <div id="confirmacion-compra">
      <div className="container mt-4 mb-4">
        <div className="row d-flex cart align-items-center justify-content-center">
          <div className="col-md-10">
            <div className="card larger-card">
              <div className="row g-0">
                <div className="col-md-6 border-right p-5">
                  <div className="text-center order-details">

                    <div className="d-flex justify-content-center mb-4 flex-column align-items-center">
                      <span className="check1">
                        <i className="fa fa-check"></i>
                      </span>
                      <h1>
                        <span className="font-weight-bold">Orden Confirmada</span>
                      </h1>
                      <small className="mt-2">Muchas gracias por su compra</small>
                    </div>
                    <Link to={"/user"}>
                      <button className="btn btn-danger btn-block order-button">
                        Ver mis Tickets
                      </button>
                    </Link>

                  </div>
                </div>
                <div className="col-md-6 background-muted">
                  <div className="p-4 border-bottom">
                    <div className="mt-3">
                      <h1 class="display-4">{eventName}</h1><br></br>
                      <span className="d-block mb-0">{eventLocation}</span>
                      <small>{eventTime}</small><br></br>
                      <small>{eventDate}</small>
                    </div>
                  </div>
                  <div className="row g-0 border-bottom">
                    <div className="col-md-6 border-right">
                      <div className="p-4 d-flex justify-content-center align-items-center">
                        <span>x{quantity}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="p-4 d-flex justify-content-center align-items-center">
                        <span>${totalAmount / quantity} por unidad</span>
                      </div>
                    </div>
                  </div>

                  <div className="row g-0">
                    <div className="col-md-6">
                      <div className="p-4 d-flex justify-content-center align-items-center">
                        <span className="font-weight-bold">Total</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="p-4 d-flex justify-content-center align-items-center">
                        <span className="font-weight-bold">${totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
