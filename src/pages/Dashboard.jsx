import React from "react";
import Navbar from "../components/layout/Navbar";

function Dashboard({ sidebarToggle, setSidebarToggle }) {

  
  return (
    // <div className="w-full" en el desarrollo>
    //className={`${sidebarToggle ? "ml-0" : "ml-64"} w-full`} esto se quita segun cgpt
    <div>
      <Navbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
    </div>
  );
}

export default Dashboard;
