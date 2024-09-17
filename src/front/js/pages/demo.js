import React, { useState, useContext } from "react";

import { Context } from "../store/appContext";
import Sidebar from "../component/sidebar.jsx";
import EventList from "../component/eventList.jsx";
import UserList from "../component/userList.jsx";
import CrearEvento from "../component/crearEvento.jsx";

export const Demo = () => {
  const { store, actions } = useContext(Context);
  const [activeList, setActiveList] = useState("events"); // Estado para alternar entre eventos y usuarios

  return (
    <div className="d-flex col-10 mx-auto">
      {/* Sidebar */}
      <Sidebar setActiveList={setActiveList} />

      {/* Main content */}
      <div className="col-10">
        {activeList === "events" ? <div><EventList /><br /><CrearEvento /></div> : <UserList />}
      </div>
    </div>
  );
};
