// src/hooks/useQueryParams.js
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

const BASE_PARAMS = ["page", "per_page", "all_data", "search", "ordering"];

const useQueryParams = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const page = Number(queryParams.get("page")) || 1;
  const per_page = Number(queryParams.get("per_page")) || 10;
  const all_data = queryParams.get("all_data") === "true";
  const search = queryParams.get("search") || "";
  const ordering = queryParams.get("ordering") || "";

  const filters = {};
  queryParams.forEach((value, key) => {
    if (!BASE_PARAMS.includes(key)) {
      filters[key] = value;
    }
  });

  const setQueryParams = (newParams) => {
    const newQuery = new URLSearchParams(location.search);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        newQuery.delete(key);
      } else {
        newQuery.set(key, value.toString());
      }
    });

    // Si all_data es true, eliminar page y per_page (y opcionalmente search)
    if (newParams.all_data === true) {
      newQuery.delete("page");
      newQuery.delete("per_page");
      // Si quieres eliminar también search cuando all_data es true, descomenta:
      // newQuery.delete("search");
    } else {
      // Si cambian otros params que no sean page, resetear page a 1
      if (Object.keys(newParams).some((k) => k !== "page")) {
        newQuery.set("page", "1");
      }
    }

    navigate(`${location.pathname}?${newQuery.toString()}`, { replace: true });
  };

  return {
    page,
    per_page,
    all_data,
    search,
    ordering,
    filters,
    setQueryParams,
  };
};

export default useQueryParams;
