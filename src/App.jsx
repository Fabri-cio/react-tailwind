import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  //esto deberia ir en className
  const mainClass = `${sidebarToggle ? "ml-0" : "ml-64"} w-full`;

  return (
    <BrowserRouter>
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
