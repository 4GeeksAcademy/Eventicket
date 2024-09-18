import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

const UserList = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getUsers(); // Llamar al fetch para obtener los usuarios
  }, [actions]);

  // Acceder a los usuarios del store
  const users = store.users || []; // Asegurarse de que users esté definido como un array

  const handleDelete = async (userId) => {
    const success = await actions.deleteUser(userId);
    if (success) {
      console.log("User deleted successfully");
    } else {
      console.error("Failed to delete user");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row mb-2">
        <div className="col-2">
          <strong>Nombre</strong>
        </div>
        <div className="col-2">
          <strong>Apellido</strong>
        </div>
        <div className="col-2">
          <strong>Email</strong>
        </div>
        <div className="col-2">
          <strong>Contraseña</strong>
        </div>
        <div className="col-2">
          <strong>Telefono</strong>
        </div>
        <div className="col-2 text-end">
          <strong>Acciones</strong>
        </div>
      </div>
      {users.map((user) => (
        <div className="row mb-3 align-items-center" key={user.id}>
          <div className="col-2">{user.name}</div>
          <div className="col-2">{user.last_name}</div>
          <div className="col-2">{user.email}</div>
          <div className="col-2">{user.password}</div>
          <div className="col-2">{user.phone}</div>
          <div className="col-2 text-end">
            <button className="btn btn-outline-primary btn-sm me-2">
              <i className="fa-solid fa-pencil"></i>
            </button>
            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(user.id)}>
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
