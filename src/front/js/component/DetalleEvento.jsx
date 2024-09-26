import React, { useEffect, useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/detalleEvento.css";
import { useNavigate } from "react-router-dom";


export const DetalleEvento = () => {
  const { eventId } = useParams();
  const { store, actions } = useContext(Context);
  const [event, setEvent] = useState(null);
  const paypalRef = useRef();

  const [isPaying, setIsPaying] = useState(false);
  const [quantityValue, setQuantityValue] = useState(0);
  const [state, setState] = useState("")
  const crearcompra = actions
  const navigate = useNavigate();


  const handleQuantityChange = (e) => {
    setQuantityValue(e.target.value);
    setIsPaying(false);
    paypalRef.current.innerHTML = '';
  };

  const handleBuy = () => {
    if(!store.currentUser){
      return alert("logeate para realizar la compra")
    }

    if(quantityValue>event.stock){
      setIsPaying(false);
      return alert("No hay suficientes tickets para poder realizar la compra")
    }
    setIsPaying(true);
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
            setState(order.status);

            console.log("Pago realizado con éxito:", order);

            navigate("/confirmacionCompra", {
              state: {
                eventName: event.title,
                eventLocation: event.location,
                eventTime: event.time,
                eventDate: event.date,
                quantity: quantityValue,
                totalAmount: event.price * quantityValue,
              },
            });
          },
          onError: (err) => {
            console.log("Error en el pago");
          },
        }).render(paypalRef.current);
      }
    }

  }, [isPaying, quantityValue, event]);

  useEffect(() => {
    const makePurchase = async () => {
      if (state) { await actions.createPurchase(Number(eventId), state, Number(quantityValue)); console.log("compra exitosa") }
    }
    makePurchase();

  }, [state]);



  if (!event) {
    return null;
  }


  return (
    <div className="container pt-5">
      <h1 className="text-center display-1 text-info-emphasis text-primary fw-semibold">{event.title}</h1>
      <div className="d-flex justify-content-start">
        <p className="text-center text-secondary me-3"><i className="fas fa-map-marker-alt text-primary"></i> {event.location}</p>
        <p className="text-center text-secondary"><i className="fa fa-check-square text-primary" aria-hidden="true"></i> {event.category}</p>
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
          <br />
          <br />
          <div className="evento-info  col-12 d-flex flex-column mb-2 rounded boton-verde p-2">
            <h3 className="text-info-emphasis text-primary">Descripción</h3>
            <div className="mb-2 p-2">{event.description}</div>
          </div>
        </div>
        <div className="col-lg-6 col-md-8 col-sm-12 mx-auto rounded">
          <div className="buy-section p-4 rounded shadow-sm">
            <h3 className="text-start">{event.title}</h3>
            <hr />
            <p className="fw-bold fs-4 text-start text-danger">
              Precio: s/. <strong className="text-info-emphasis text-danger">{event.price}</strong>
            </p>
            <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <div className="col-6 d-flex justify-content-start">
                  <label htmlFor="date" className="fw-bold fs-5">
                    <i className="fas fa-calendar-alt calendar-icon"></i> Fecha:
                  </label>
                </div>
                <div className="col-6  fw-bold fs-5">
                  <strong>{event.date}</strong>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <div className="col-6 d-flex justify-content-start">
                  <label htmlFor="horario" className="fw-bold fs-5">
                    <i className="fas fa-clock time-icon"></i> Horario:
                  </label>
                </div>
                <div className="col-6  fw-bold fs-5">
                  <strong>{event.time}</strong>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <div className="col-6 d-flex justify-content-start">
                  <i className="fas fa-globe world-icon"></i>
                  <label className="fw-bold fs-5 ms-2">Ubicación:</label>
                </div>
                <div className="col-6  fw-bold fs-5">
                  <strong>{event.location}</strong>
                </div>
              </div>
            </div>
            <div className="row  availability-section mt-3">
              <div className="row align-items-center mb-3">
                <label htmlFor="quantityInput" className="fw-bold col-6 fs-5"><i className="fa fa-ticket ticket-icon" aria-hidden="true"></i> Cantidad : </label>
                <div className="col-6 d-flex justify-content-center">
                  <div className="input-group  ">
                    <button
                      className="btn btn-outline-info boton-menos rounded-circle"
                      onClick={() => setQuantityValue(Math.max(0, quantityValue - 1))}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <input
                      type="number"
                      id="quantityInput"
                      value={quantityValue}
                      onChange={handleQuantityChange}
                      className="text-center fw-bold  fs-5 bg-transparent border-0 p-0 mx-1 col-2"
                      readOnly
                    />
                    <button
                      className="btn btn-outline-info boton-mas rounded-circle"
                      onClick={() => setQuantityValue(quantityValue + 1)}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div>
              </div>
              <div className="row">
                <p className="text-muted">Quedan {event.stock} tickets disponibles</p>
              </div>
            </div>
            <hr className="text-dark mb-2" />
            <div className="d-flex justify-content-between total-section">
              <strong className=" mb-4 nombre-precio-total">Total a Pagar:</strong>
              <strong className=" nombre-precio-total">S/{event.price * quantityValue}</strong>
            </div>
            <div ref={paypalRef} className="mt-3"></div>
            <button className="btn btn-primary w-100" onClick={handleBuy}>Pagar ahora</button>
          </div>
        </div>
      </div>
    </div>
  );
};