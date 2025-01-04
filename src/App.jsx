import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import clsx from "clsx";

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  //esto deberia ir en className
  const mainClass = clsx("w-full", {
    "ml-0": sidebarToggle,
    "ml-64": !sidebarToggle,
  });

  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <div className="flex">
        <Sidebar sidebarToggle={sidebarToggle} />
        <div className={mainClass}>
          <Dashboard
            sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle}
          />
          <AppRoutes />
        </div>
      </div>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
