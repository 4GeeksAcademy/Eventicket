import React from 'react';
import profile from "../../img/profile.png";

const NavbarUser = () => {
    return (
        <div className="navbar bg-white d-flex justify-content-start shadow-lg p-3 mb-5 bg-body-tertiary rounded-3">
            <div className="row align-items-center">
                <div className="col-auto">
                    <div className="img-profile">
                        <img className="img-profile rounded-circle" src={profile} alt="Profile" style={{ width: '50px', height: '50px' }} />
                    </div>
                </div>
                <div className="col-auto">
                    <div>
                        <span className="d-block fs-6">HOLA😊💕</span>
                        <h4 className="text-black m-0 ">Pepita Lopez</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavbarUser;