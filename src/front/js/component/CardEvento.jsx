import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const CardEvento = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getEvents();
  }, []);

  const events = store.events || [];

  return (
    <div className="container py-5">
      <h1 className="text-center">Próximos eventos</h1>
      <div className="container mt-4">
        <div className="row">
          {events.map((event) => (
            <div className="col-md-4 mb-4" key={event.id}>
              <div className="card">
                <img
                  src={event.image_url || "https://picsum.photos/300/200/"}
                  className="card-img-top"
                  alt={event.name}
                  style={{ height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-primary fs-4">{event.name}</h5>
                  <div className="d-flex justify-content-between">
                    <i className="fa-solid fa-location-dot fs-5"></i>
                    <p className="fs-5">{event.place}</p>
                    <button className="btn btn-outline-warning">
                      <i className="fa fa-heart-o" aria-hidden="true"></i>
                    </button>
                  </div>
                  <p className="fs-5">
                    <i className="fa-regular fa-calendar"></i> {event.date}
                  </p>
                </div>
                <div className="mb-5 d-flex justify-content-around">
                  <h3>s/{event.ticket}</h3>
                  <button className="btn boton-verde rounded-pill fs-5 fw-bold">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
