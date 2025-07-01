import { useQuery } from "@tanstack/react-query";

const useData = (api, queryKey, id, params = {}, staleTime = 1000 * 60 * 5) => {
  const {
    all_data = false,
    page = 1,
    per_page = 10,
    search = "",
    filters = {},
  } = params;

  const fullParams = {
    ...filters,
    ...(search ? { search } : {}),
    page,
    per_page,
    ...(all_data ? { all_data: true } : {}),
  };

  return useQuery({
    queryKey: id ? [queryKey, id] : [queryKey, fullParams],
    queryFn: () => {
      if (id) return api.getOne(id);

      const hasFilters = Object.keys(filters).length > 0;
      const hasSearch = search && search.trim() !== "";

      if (hasFilters || all_data) return api.getFiltered(fullParams);

      if (hasSearch) return api.search(search, page, per_page);

      return api.getAll(all_data, page, per_page);
    },
    enabled: id ? !!id : true,
    staleTime,
  });
};

export default useData;
