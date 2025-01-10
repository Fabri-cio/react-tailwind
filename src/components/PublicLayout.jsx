import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-300">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
