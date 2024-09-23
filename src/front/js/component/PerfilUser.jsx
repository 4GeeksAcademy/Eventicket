import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';


const PerfilUser = () => {
  const { store, actions } = useContext(Context);
  const { currentUser } = store;

  // Estado para almacenar los datos del perfil del usuario
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
  }, [currentUser]);

  // Maneja el cambio en los campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Maneja el clic en el botón de guardar para actualizar los datos del usuario
  const handleUpdateUser = () => {
    const userId = currentUser.id;
    actions.updateUser(userId, profileData);
  };

  return (
    <div className="container " >
      <h2 className="mb-4">Datos Personales</h2>
      <form>
        {/* Fila para Nombre, Apellido Paterno y Apellido Materno */}
        <div className="row mb-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              name="name"
              // value={profileData.nombre}
              value={profileData.name}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Apellido Paterno"
              name="last_name"
              // value={profileData.apellidoPaterno}
              value={profileData.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              placeholder="Fecha de Nacimiento"
              name="date_of_birth"
              value={profileData.date_of_birth}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Fila para DNI, Celular y Correo Electrónico */}
        <div className="row mb-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="DNI"
              name="dni"
              value={profileData.dni}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Celular"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              type="email"
              className="form-control"
              placeholder="Correo Electrónico"
              name="email"
              //SE SUPONE EL CORREO NO SE PUEDE MODIFICAR ASI QUE SU EDICION DEBE ESTAR BLOQUEADA
              value={profileData.email}
              disabled
            />
          </div>
        </div>

        {/* Botón para guardar los cambio o añadir alguna info del user */}
        <button type="button" className="btn btn-primary" onClick={handleUpdateUser}>
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default PerfilUser;