import React, { useEffect, useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/detalleEvento.css";

export const DetalleEvento = () => {
  const { eventId } = useParams();
  const { store, actions } = useContext(Context); 
  const [event, setEvent] = useState(null); 
  const paypalRef = useRef();

  const [isPaying, setIsPaying] = useState(false);
  const [quantityValue, setQuantityValue] = useState(0); 
  const [state,setState]=useState("")
  const crearcompra=actions

  const handleQuantityChange = (e) => {
    setQuantityValue(e.target.value);
    setIsPaying(false);
    paypalRef.current.innerHTML = '';
  };

  const handleBuy = () => {
    setIsPaying(!isPaying);
  };

  useEffect(() => {
    const loadEvent = async () => {
      const fetchedEvent = await actions.getEventById(eventId); 
      setEvent(fetchedEvent);
    };

    loadEvent();
  }, [eventId, actions]);

  useEffect(() => {
    if (isPaying && event) {
      if (paypalRef.current) {
        paypalRef.current.innerHTML = '';
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: event.title,
                  amount: {
                    currency_code: "USD",
                    value: event.price * quantityValue,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            setState(order.status)
            console.log("Pago realizado con éxito:", order);
          },
          onError: (err) => {
            console.log("Error en el pago:", err);
          },
        }).render(paypalRef.current);
      }
    }
  }, [isPaying, quantityValue]);

  useEffect(() => {
    const makePurchase = async () => {
      if(state){await actions.createPurchase(Number(eventId), state,Number(quantityValue));console.log("compra exitosa")}}
    makePurchase();
  }, [state]);
  

  if (!event) {
    return null
  }

  return (
    <div className="container">
      <h1 className="text-center display-1 text-info-emphasis text-primary fw-semibold">{event.title}</h1>
      <div className="d-flex justify-content-start">
        <p className="text-center text-secondary me-3"><i className="fas fa-map-marker-alt text-primary"></i> {event.location}</p>
        <p className="text-center text-secondary"><i className="fa fa-check-square text-primary" aria-hidden="true"></i> Evento Cultural</p>
      </div>
      <div className="row">
        <div className="col-lg-6 rounded">
          <div className="carousel slide mb-5" id="carouselDemo" data-bs-wrap="true">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={event.image_url || "https://picsum.photos/300/200/"} className="w-100" />
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img src="https://oldbcn.com/images/agenda/musica/tosca.jpg" className="w-100" />
              </div>
              <div className="carousel-item">
                <img src="https://www.operaworld.es/wp-content/uploads/2023/02/Captura-de-Pantalla-2023-02-27-a-las-22.56.56.png" className="w-100" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselDemo" data-bs-slide="prev">
              <span className="carousel-control-prev-icon green"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselDemo" data-bs-slide="next">
              <span className="carousel-control-next-icon green"></span>
            </button>
            <div className="carousel-indicators spacing">
              <button type="button" className="active" data-bs-target="#carouselDemo" data-bs-slide-to="0">
                <img src="https://i0.wp.com/iopera.es/wp-content/uploads/2018/10/Tosca-de-Puccini-desde-Helsinki-desde-la-%C3%93pera-Nacional-de-Finlandia-v%C3%ADdeo-de-la-%C3%B3pera-en-la-representaci%C3%B3n-en-directo-del-7-de-octubre-de-2018-giacomo.jpg" />
              </button>
              <button type="button" data-bs-target="#carouselDemo" data-bs-slide-to="1">
                <img src="https://oldbcn.com/images/agenda/musica/tosca.jpg" />
              </button>
              <button type="button" data-bs-target="#carouselDemo" data-bs-slide-to="2">
                <img src="https://www.operaworld.es/wp-content/uploads/2023/02/Captura-de-Pantalla-2023-02-27-a-las-22.56.56.png" />
              </button>
            </div>
          </div>
          <div className="evento-info mt-4 pt-5">
            <h3 className="text-info-emphasis text-primary">Descripción</h3>
            <p>{event.description}</p>
          </div>
        </div>
        <div className="col-lg-6 rounded">
          <div className="buy-section">
            <h3>{event.title}</h3>
            <hr />
            <p className="fw-bold fs-4">Precio: <strong className="text-info-emphasis text-danger">{event.price}</strong></p>
            <div className="d-flex align-items-center">
              <label htmlFor="date" className="fw-bold"><i className="fas fa-calendar-alt calendar-icon"></i> Fecha:</label>
              <p className="fw-bold"><strong>{event.date}</strong></p>
            </div>
            <div className="d-flex align-items-center mt-3">
              <label htmlFor="horario" className="fw-bold"><i className="fas fa-clock time-icon"></i> Horario:</label>
              <p className="fw-bold"><strong>{event.time}</strong></p>
            </div>
            <div className="d-flex align-items-center mt-3">
              <i className="fas fa-globe world-icon"></i>
              <p className="fw-bold">Disponible en: <strong>{event.location}</strong></p>
            </div>
            <div className="availability-section">
              <label htmlFor="tickets" className="fw-bold">Cantidad a comprar:</label>
              <input
                type="number"
                id="quantityInput"
                value={quantityValue}
                onChange={handleQuantityChange}
                placeholder="Enter quantity"
              />
              <p className="text-muted">Quedan {event.stock} tickets disponibles</p>
            </div>
            <div ref={paypalRef} className="mt-3"></div>
            <button className="btn btn-primary" onClick={handleBuy}>Pagar ahora</button>
          </div>
        </div>
      </div>
    </div>
  );
};