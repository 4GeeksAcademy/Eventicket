import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const CardEvento = () => {
  const { store, actions } = useContext(Context);

  const handleAddFavourite = (event_id) => {
    actions.addFavourite(event_id); // Llama a la acción addFavourite del flux
  };

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
                  alt={event.title}
                  style={{ height: "200px" }}
                />
                <div className="card-body">
                  <h2 className="card-title text-primary mb-2 mx-2">{event.title}</h2>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                      <i className="fa-solid fa-location-dot px-2 fs-3"></i><h3 className="px-2 mb-1">{event.location}</h3>
                    </div>
                    <button className="btn btn-outline-warning" onClick={() => handleAddFavourite(event.id)}>
                      <i className="fa fa-heart-o px-2" aria-hidden="true"></i>
                    </button>
                  </div>
                  <div className="d-flex align-items-center fs-4 mb-2">
                    <i className="fa-regular fa-calendar px-2"></i>
                    <p className="px-2 mb-0">{event.date}</p>
                  </div>
                  <div className="d-flex align-items-center fs-4 mb-2">
                    <i className="fa-regular fa-calendar px-2"></i>
                    <p className="px-2 mb-0">{event.time}</p>
                  </div>
                </div>
                <div className="mb-5 d-flex justify-content-around align-items-center">
                  <h5 className="my-0">Desde S/. {event.price}</h5>
                  <Link to="/detalle">
                    <button className="btn boton-verde rounded-pill fw-bold">
                      Ver detalles
                    </button>
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
