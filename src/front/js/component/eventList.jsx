import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import '../../styles/lista-evento.css'

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
    <div className="container container-list-event mt-4 col-12">
      <h1 className="h1-list-event">Lista de Eventos</h1>
      <hr className="text-color-gray" />
      <div className="row row-list-event mb-3 align-items-center card border-0">
        <div className="card-body card-body-list-event d-flex">
          <div className="col-2">
            <strong className="strong-list-event">Evento</strong>
          </div>
          <div className="col-2">
            <strong className="strong-list-event">Lugar</strong>
          </div>
          <div className="col-2">
            <strong className="strong-list-event">Fecha</strong>
          </div>
          <div className="col-2">
            <strong className="strong-list-event">Aforo</strong>
          </div>
          <div className="col-2">
            <strong className="strong-list-event">Precio</strong>
          </div>
          <div className="col-2 text-start">
            <strong className="strong-list-event-acc fw-bold">Acciones</strong>
          </div>
        </div>
      </div>

      {events.map((event) => (
        <div className="row row-list-event mb-3 align-items-center card" key={event.id}>
          <div className="card-body card-body-list-event d-flex">
            <div className="col-2 strong-list-event">{event.title}</div>
            <div className="col-2 strong-list-event">{event.location}</div>
            <div className="col-2 strong-list-event"><span className="span-list-event">{event.date}</span></div>
            <div className="col-2 strong-list-event">{event.stock} <span className="span-list-event">personas</span></div>
            <div className="col-2 strong-list-event">S/.{event.price}</div>
            <div className="col-2 text-start">
              <Link to={`/editarEvento/${event.id}`} className="btn btn-list-event btn-outline-primary btn-sm me-1">
                <i className="fa-solid fa-pencil"></i>
              </Link>
              <button className="btn btn-list-event btn-outline-danger btn-sm" onClick={() => handleDelete(event.id)}>
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
