import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import { Outlet } from "react-router-dom";
import clsx from "clsx";

const MainLayout = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const mainClass = clsx("w-full", {
    "ml-0": sidebarToggle,
    "ml-64": !sidebarToggle,
  });

  return (
    <div className="flex">
      <Sidebar sidebarToggle={sidebarToggle} />
      <div className={mainClass}>
        <Dashboard
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
