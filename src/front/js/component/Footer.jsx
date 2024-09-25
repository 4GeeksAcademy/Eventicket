import React from "react";

export const Footer = () => (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
        <div className="container text-center text-md-left">
            <div className="row text-center text-md-left">
                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h5 className="font-weight-bold">EventTicket </h5>
                    <p>Una manera facil de obtener tickets </p>
                </div>

                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h5 className=" mb-4 font-weight-bold text-primary">Conocénos</h5>
                    <p> <a href="#" className="text-white" style={{ textDecoration: "none" }}  >¿Acerca de Nosotros?</a></p>
                    <p> <a href="#" className="text-white" style={{ textDecoration: "none" }}  >Preguntas Frecuentes</a></p>
                    <p> <a href="#" className="text-white" style={{ textDecoration: "none" }}  >Termino y condiciones</a></p>
                </div>

                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h5 className=" mb-4 font-weight-bold text-primary">Trabajemos juntos</h5>
                    <p> <a href="#" className="text-white" style={{ textDecoration: "none" }}  >¿Tienes un evento?</a></p>
                </div>

                <div className="col-md-4 col-lg-3 col-xl-4 mx-auto mt-3">
                    <h5 className=" mb-4 font-weight-bold text-primary" >Contact</h5>
                    <p><i className="fas fa-home mr-3"  ></i> Lima, San Borja #750, PERÚ </p>
                    <p><i className="fas fa-envelope mr-3" ></i> eventicket@gmail.com </p>
                    <p><i className="fas fa-phone mr-3 " ></i>  +51 950269683</p>
                </div>
                <hr className="mb-4" />
                <div className="row align-items-center">
                    <div className="col-md-7 col-lg-8">
                        <p>Copyright 2024 All right reserverd by: EventTicket❤️ </p>
                    </div>
                    <div className="col-md-5 col-lg-4">
                        <div className="text-center text-md-right">
                            <ul className="list-unstyled list-inline" >
                                <li className="list-inline-item">
                                    <a href="#" className="btn-floating btn-sm text-white" style={{ fontSize: "23px" }}><i className="fab fa-facebook"></i> </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn-floating btn-sm text-white" style={{ fontSize: "23px" }} ><i className="fab fa-instagram"></i> </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn-floating btn-sm text-white" style={{ fontSize: "23px" }} ><i className="fab fa-linkedin"></i> </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);