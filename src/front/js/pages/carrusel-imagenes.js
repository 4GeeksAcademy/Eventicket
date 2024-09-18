import React from "react";
import '../../styles/carrusel-imagenes.css';
import carrusel1 from "../../img/carrousel1.jpg";
import carrusel2 from "../../img/carrousel2.jpg";
import carrusel3 from "../../img/carrousel3.jpg";

export const Carrusel = () => {
  return (
<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
<div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">

      <img src={carrusel2} class="d-block w-100" />
        </div>
        <div className="carousel-item">
          <img src={carrusel1}  class="d-block w-100" />
        </div>
        <div className="carousel-item">
          <img src={carrusel3}  class="d-block w-100" />
		  </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  );
};