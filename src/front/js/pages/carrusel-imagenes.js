import React from "react";
import '../../styles/carrusel-imagenes.css';
import carrusel1 from "../../img/carrousel1.jpg";
import carrusel2 from "../../img/carrousel2.jpg";
import carrusel3 from "../../img/carrousel3.jpg";

export const Carrusel = () => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">

          <img src={carrusel2} className="d-block w-100" />
        </div>
        <div className="carousel-item">
          <img src={carrusel1} className="d-block w-100" />
        </div>
        <div className="carousel-item">
          <img src={carrusel3} className="d-block w-100" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};