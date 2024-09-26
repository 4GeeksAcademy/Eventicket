import React from "react";
import { Carrusel } from "./carrusel-imagenes"
import { CardEvento } from "../component/CardEvento.jsx"

import "../../styles/home.css";

export const Home = () => {

	return (
		<div>
			<Carrusel />
			<CardEvento />
		</div>

	);
};
