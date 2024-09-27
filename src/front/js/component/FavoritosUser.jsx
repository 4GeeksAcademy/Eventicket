import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/CardEvento.css";

const FavoritosUser = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getFavourites();
    }, []);

    const favourites = store.favorites || [];

    return (
        <div className="container py-1">
            <h1 className="text-center fs-1 text-primary">Mis Favoritos</h1>
            <div className="container mt-4">
                <div className="row row-cols-1 row-cols-md-3 g-4 py-3">
                    {favourites.map((favorito) => (
                        <div className="col-md-4 mb-4" key={favorito.id}>
                            <div className="card image-container h-100 shadow-sm">
                                <img
                                    src={favorito.image_url || "https://picsum.photos/300/200/"}
                                    className="card-img-top"
                                    alt={favorito.title}
                                    style={{ height: "230px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h4 className="card-title text-primary mb-2">{favorito.title}</h4>

                                    <div className=" row d-flex justify-content-between align-items-center mb-2">
                                        <div className=" col-9 d-flex align-items-center">
                                            <i className="fa-solid fa-location-dot px-2 fs-4"></i>
                                            <span>{favorito.location}</span>
                                        </div>
                                        <div className="col-3">
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={async() => await actions.deleteFavourite(favorito.id)}
                                            >
                                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center fs-5 mb-2">
                                        <i className="fa-regular fa-calendar px-2"></i>
                                        <span>{favorito.date}</span>
                                    </div>
                                    <div className="d-flex align-items-center fs-5 mb-2">
                                        <i className="fa-regular fa-clock px-2"></i>
                                        <span>{favorito.time}</span>
                                    </div>
                                </div>
                                <div className="card-footer bg-white border-top-0 d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="my-0 text-primary fs-4 fw-bolder">S/. {favorito.price}</h6>
                                    <Link to={`/detalle/${favorito.id}`}>
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

export default FavoritosUser;
