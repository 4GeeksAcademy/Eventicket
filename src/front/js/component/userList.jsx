import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import '../../styles/lista-evento.css'


const UserList = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getUsers(); // Llamar al fetch para obtener los usuarios
  }, []);

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
      <h1>Lista de Usuarios</h1>
      <hr className="text-color-gray" />
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-info">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Email</th>
              <th scope="col">Contraseña</th>
              <th scope="col">Celular</th>
              <th scope="col" className="text-start">Acciones</th>
            </tr>
          </thead>
          <tbody >
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td className="text-start">
                  <button className="btn btn-outline-primary btn-sm me-2">
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(user.id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default UserList;
