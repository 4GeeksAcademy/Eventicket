import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

const EventList = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getEvents(); // Llamar al fetch para obtener los eventos
  }, []);

  // Acceder a los eventos del store
  const events = store.events || [];

  const handleDelete = async (eventId) => {
    const success = await actions.deleteEvent(eventId);
    if (success) {
      console.log("Event deleted successfully");
    } else {
      console.error("Failed to delete event");
    }
  };


  return (
    <div className="container mt-4 col-12">
      <h1>Lista de Eventos</h1>
      <hr className="text-color-gray" />
      <div className="row mb-3 align-items-center card border-0">
        <div className="card-body d-flex">
          <div className="col-2">
            <strong>Nombre del evento</strong>
          </div>
          <div className="col-2">
            <strong>Lugar</strong>
          </div>
          <div className="col-2">
            <strong>Fecha</strong>
          </div>
          <div className="col-2">
            <strong>Aforo</strong>
          </div>
          <div className="col-2">
            <strong>Precio</strong>
          </div>
          <div className="col-2 text-end">
            <strong>Acciones</strong>
          </div>
        </div>
      </div>

      {events.map((event) => (
        <div className="row mb-3 align-items-center card" key={event.id}>
          <div className="card-body d-flex">
            <div className="col-2">{event.title}</div>
            <div className="col-2">{event.location}</div>
            <div className="col-2">{event.date}</div>
            <div className="col-2">{event.stock} personas</div>
            <div className="col-2">S/.{event.price}</div>
            <div className="col-2 text-end">
              <button className="btn btn-outline-primary btn-sm me-2">
                <i className="fa-solid fa-pencil"></i>
              </button>
              <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(event.id)}>
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
