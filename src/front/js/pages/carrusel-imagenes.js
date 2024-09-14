import React, { useContext } from "react";
import { Link } from "react-router-dom";

// import { Context } from "../store/appContext";
import '../../styles/home.css';

export const Carrusel = () => {
	// const { store, actions } = useContext(Context);
	return (
		<div id="carouselExampleIndicators" className="carousel slide">
			<div className="carousel-indicators">
				<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
				<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
				<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
			</div>
			<div className="carousel-inner">
				<div className="carousel-item active">
					<img src="https://img.freepik.com/fotos-premium/astronauta-luna-trabajando-inteligencia-artificial-generativa-portatil_886951-766.jpg" className="d-block w-100 carrusel" alt="carrusel1" />
				</div>
				<div className="carousel-item">
					<img src="https://www.technomag.fr/wp-content/uploads/2023/11/tomorrowland-2023-bresil-960x1000.png" className="d-block w-100 carrusel" alt="carrusel2" />
				</div>
				<div className="carousel-item">
					<img src="https://img.freepik.com/fotos-premium/planeta-espacio-ia-generativa_445983-2320.jpg" className="d-block w-100 carrusel" alt="carrusel3" />
				</div>
			</div>
			<button className="icon-button icon-button-left" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
				<i className="fa-solid fa-angle-left"></i> {/* Ícono rotado a la izquierda*/}
				<span className="visually-hidden">Previous</span>
			</button>
			<button className="icon-button icon-button-right" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
				<i className="fa-solid fa-angle-right"></i>	{/* Ícono rotado a la derecha */}
				<span className="visually-hidden">Next</span>
			</button>
		</div>
	);
};
