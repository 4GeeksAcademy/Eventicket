import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/CardEvento.css";

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
    <div className="container py-2">
      <h1 className="text-center fs-1 text-primary">Próximos eventos</h1>
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-3 g-4 py-3">
          {events.map((event) => (
            <div className="col-md-4 mb-4" key={event.id}>

              <div className="card  image-container  h-100 shadow-sm ">
                <img
                  src={event.image_url || "https://picsum.photos/300/200/"}
                  className="card-img-top"
                  alt={event.title}
                  style={{ height: "230px", objectFit: "cover", }}
                />
                <div className="card-body ">
                  <h4 className="card-title text-primary ">{event.title}</h4>

                  <div className="row  d-flex justify-content-between align-items-center mb-2">
                    <div className=" col-9 d-flex align-items-center">
                      <i className="fa-solid fa-location-dot px-2 fs-4"></i>
                      <h6 className=" mb-0">{event.location}</h6>
                    </div>
                    <div className="col-3" >
                      <button className="btn btn-outline-warning" onClick={() => handleAddFavourite(event.id)}>
                        <i className="fa fa-heart-o " aria-hidden="true"></i>
                      </button>
                    </div>

                  </div>
                  <div className="d-flex align-items-center fs-5 mb-2">
                    <i className="fa-regular fa-calendar px-2"></i>
                    <p className=" mb-0">{event.date}</p>
                  </div>
                  <div className="d-flex align-items-center fs-5 mb-2">
                    <i className="fa-regular fa-clock px-2"></i>
                    <p className=" mb-0">{event.time}</p>
                  </div>
                </div>
                <div className="card-footer bg-white border-top-0 d-flex justify-content-between align-items-center mb-3">
                  <h6 className="my-0  text-primary fs-4 fw-bolder"> S/. {event.price}</h6>
                  <Link to={`/detalle/${event.id}`}>
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
