import React, { useState } from 'react';

const PerfilUser = () => {
  // Estado para almacenar los datos del perfil del usuario
  const [profileData, setProfileData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    dni: '',
    celular: '',
    correoElectronico: '',
  });

  // Maneja el cambio en los campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Maneja el clic en el botón de guardar
  const handleSave = () => {
    console.log('Datos guardados:', profileData);
    // Faltaaaaa  la lógica para guardar los datos
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
              name="nombre"
              // value={profileData.nombre}
              value="Pepita"
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Apellido Paterno"
              name="apellidoPaterno"
              // value={profileData.apellidoPaterno}
              value="Lopez"
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Apellido Materno"
              name="apellidoMaterno"
              value={profileData.apellidoMaterno}
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
              name="celular"
              value={profileData.celular}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              type="email"
              className="form-control"
              placeholder="Correo Electrónico"
              name="correoElectronico"
              // value={profileData.correoElectronico}
              //SE SUPONE EL CORREO NO SE PUEDE MODIFICAR ASI QUE SU EDICION DEBE ESTAR BLOQUEADA
              value="pepita123@gamil.com"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Botón para guardar los cambio o añadir alguna info del user */}
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Guardar
        </button>
      </form>
    </div>
  );
};

export default PerfilUser;