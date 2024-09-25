import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const FavoritosUser = () => {

    const { store, actions } = useContext(Context);


    useEffect(() => {
        actions.getFavourites();
    }, []);

    const favourites = store.favorites || [];

    return (
        <div className="container py-5">
            <h1 className="text-center">Mis Favoritos</h1>
            <div className="container mt-4">
                <div className="row">
                    {favourites.map((favorito, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card">
                                <img
                                    src={favorito.image_url || "https://picsum.photos/300/200/"}
                                    className="card-img-top"
                                    alt={favorito.title}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-primary mb-2">{favorito.title}</h5>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div className="d-flex align-items-center">
                                            <i className="fa-solid fa-location-dot px-2 fs-4"></i>
                                            <span>{favorito.location}</span>
                                        </div>
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => actions.deleteFavourite(favorito.id)}
                                        >
                                            <i className="fa fa-heart-o px-2" aria-hidden="true"></i> Quitar
                                        </button>
                                    </div>
                                    <div className="d-flex align-items-center fs-5 mb-2">
                                        <i className="fa-regular fa-calendar px-2"></i>
                                        <span>{favorito.date}</span>
                                    </div>
                                    <div className="d-flex align-items-center fs-5 mb-2">
                                        <i className="fa-regular fa-clock px-2"></i>
                                        <span>{favorito.time}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h6>S/. {favorito.price}</h6>
                                        <Link to={`/detalle/${favorito.id}`}>
                                            <button className="btn btn-success">Ver detalles</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default FavoritosUser;