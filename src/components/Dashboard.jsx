import React from "react";
import Navbar from "./Navbar";

function Dashboard({ sidebarToggle, setSidebarToggle }) {
  return (
    // <div className="w-full" en el desarrollo>
    <div className={`${sidebarToggle ? "ml-0" : "ml-64"} w-full`}>
      <Navbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
    </div>
  );
}

export default Dashboard;
