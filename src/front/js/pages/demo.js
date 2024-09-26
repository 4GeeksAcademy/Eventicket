import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Sidebar from "../component/sidebar.jsx";
import EventList from "../component/eventList.jsx";
import UserList from "../component/userList.jsx";
import CrearEvento from "../component/crearEvento.jsx";
import { useNavigate } from "react-router-dom";

export const Demo = () => {
  const [activeView, setActiveView] = useState("users");
  const {store}=useContext(Context)
  const navigate=useNavigate()
  const handleViewChange = (view) => {
    setActiveView(view);
  }
    useEffect(()=>{
        if(!store.admin){navigate("/")}
    },[store.admin])
    
 

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
