import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import Sidebar from "../component/sidebar.jsx";
import EventList from "../component/eventList.jsx";
import UserList from "../component/userList.jsx";
import CrearEvento from "../component/crearEvento.jsx";

export const Demo = () => {
  const [activeView, setActiveView] = useState("users");

  const handleViewChange = (view) => {
    setActiveView(view);
  }

  return (
    <div className="d-flex col-12">
      {/* Sidebar */}
      <Sidebar onViewChange={handleViewChange} style={{ minHeight: "75vh" }} />

      {/* Main content */}
      <div className="col-10 mx-auto">
        {activeView === "users" && <UserList />}
        {activeView === "events" && <EventList />}
        {activeView === "create" && <CrearEvento />}
      </div>
    </div>
  );
};
