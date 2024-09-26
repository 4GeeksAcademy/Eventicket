import React from "react";
import { Link } from "react-router-dom";
import '../../styles/confirmacion-compra.css';
import { useLocation } from "react-router-dom";
import ticket from "../../img/ticket.png";

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
    <div className="container py-5 d-flex align-items-center justify-content-center min-vh-100 ">
      <div className="col-md-2 col-lg-1 d-none d-md-flex flex-column align-items-center justify-content-center">
        <img src={ticket} className="img-fluid" style={{ maxWidth: '45px' }} alt="ticket" />
      </div>
      <div className="card shadow-lg border-0 w-100 card-verde" style={{ maxWidth: '900px' }}>
        <div className="row g-0">
          {/* Confirmation Section */}
          <div className="col-lg-6 bg-light p-4 text-center d-flex flex-column align-items-center justify-content-center ">
            <div className="mb-4">
              <i className="fa fa-check-circle text-success fs-1"></i>
            </div>
            <h2 className="fw-bold text-success">Orden Confirmada</h2>
            <p className="text-muted mb-3">Muchas gracias por su compra❤️ </p>
            <Link to="/user">
              <button className="btn btn-danger">Ver mis Tickets</button>
            </Link>
          </div>
          {/* Details Section */}
          <div className="col-lg-6 p-4 ">
            <h3 className="fw-bold">{eventName}</h3>
            <p className="mb-1 text-secondary fw-bold">{eventLocation}</p>
            <p className="mb-1 text-secondary fw-bold">{eventTime} - {eventDate}</p>
            <hr />
            <div className="d-flex justify-content-between mb-2 fw-medium">
              <span className="fw-semibold">Cantidad:</span>
              <span className="fw-semibold"> x {quantity}</span>
            </div>
            <div className="d-flex justify-content-between mb-2 fw-medium">
              <span className="fw-semibold" >Precio por unidad:</span>
              <span className="fw-semibold" >$ {(totalAmount / quantity).toFixed(2)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span className="fw-bolder">Total:</span>
              <span className="fw-bolder">$ {totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-2 col-lg-1 d-none d-md-flex flex-column align-items-center justify-content-center ">
        <img src={ticket} className="img-fluid" style={{ maxWidth: '45px' }} alt="ticket" />
      </div>
    </div>
  );
};