import React, { useContext } from "react";

import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Carrusel } from "./carrusel-imagenes"
import { CardEvento } from "../component/CardEvento.jsx"

import "../../styles/home.css";

export const Home = () => {
	// const { store, actions } = useContext(Context);

	return (
		<div>
			<Carrusel />
			<CardEvento />

		</div>

	);
};
