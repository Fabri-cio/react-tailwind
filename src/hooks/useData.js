import { useQuery } from "@tanstack/react-query";

// Hook genérico para obtener datos
const useData = (api, queryKey, id, params = {}, staleTime) => {
  const { all_data, page, search } = params;
  return useQuery({
    queryKey: id ? [queryKey, id] : [queryKey, all_data, page, search],
    queryFn: () => {
      if (id) return api.getOne(id);
      if (search) return api.search(search);
      return api.getAll(all_data, page);
    },
    ...(id && { enabled: !!id }),
    ...(id ? {} : { staleTime: staleTime }),
  });
};

export default useData;
