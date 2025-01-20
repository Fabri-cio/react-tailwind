import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <div className="flex justify-between py-3 px-4 bg-gray-100 shadow-md">
      <Link to="/productos">
        <h1 className="font-bold text-2xl">Inventarios</h1>
      </Link>
      <div></div>
    </div>
  );
}
