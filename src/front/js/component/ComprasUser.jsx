import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';

const ComprasUser = () => {
    const { store, actions } = useContext(Context);
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    const { currentUser } = store;
    const { events } = store;

    const [profileData, setProfileData] = useState({
        name: "",
        last_name: "",
        date_of_birth: "",
        dni: "",
        phone: "",
        email: ""
    });

    useEffect(() => {
        if (currentUser) {
            setProfileData({
                name: currentUser.name || "",
                last_name: currentUser.last_name || "",
                date_of_birth: currentUser.date_of_birth || "",
                dni: currentUser.dni || "",
                phone: currentUser.phone || "",
                email: currentUser.email || ""
            });
        }


        const fetchTickets = async () => {
            const fetchedTickets = await actions.getTicketsByUser();
            if (fetchedTickets && fetchedTickets.length > 0) {
                setTickets(fetchedTickets);
            } else {
                setError('No se encontraron tickets para este usuario.');
            }
        };
        fetchTickets();
    }, [actions, currentUser]);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (tickets.length === 0) {
        return <div className="text-center">Cargando tickets...</div>;
    }

    return (
        <div className="container mt-2">
            <h1 className="text-center fs-1 text-primary">Mis Compras</h1>
            {tickets.map((ticket) => {
                const event = events.find(evento => evento.id === ticket.event_id);
                console.log(event);
                return (
                    <div className="card mb-3" key={ticket.numero_ticket}>
                        <div className="card-header bg-primary text-white">
                            <h5 className="card-title">Ticket #{ticket.numero_ticket}</h5>
                        </div>
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">Evento ID: {ticket.event_id}</h6>
                            <h5 className='fs-bolder text-primary'>Evento: {event.title}</h5>
                            <p className='card-text'>
                                <strong className="text-primary">Fecha:</strong> {event.date}<br />
                                <strong className="text-primary">Hora:</strong> {event.time}<br />
                                <strong className="text-primary">Lugar:</strong> {event.location}
                            </p>
                            <p className="card-text">
                                <strong className="text-primary">Precio:</strong> ${ticket.price}<br />
                                <strong className="text-primary" >ID de compra:</strong> {ticket.purchase_id}<br />
                                <strong className="text-primary" >Comprador:</strong> {currentUser.name} {currentUser.last_name}<br />
                                <strong className="text-primary">DNI:</strong> {currentUser.dni}<br />
                            </p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Ticket #{ticket.numero_ticket}</small>
                        </div>
                    </div>)
            })}
        </div>
    );
};

export default ComprasUser;