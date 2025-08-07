import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useMutationWithToast = (
  mutationFn,
  loadingMsg,
  successMsg,
  queryKeyToInvalidate
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      toast.promise(mutationFn(data), {
        loading: loadingMsg,
        success: successMsg,
        error: (error) => {
          const data = error.response?.data;

          if (data && typeof data === "object") {
            return (
              Object.entries(data)
                .map(([campo, mensajes]) => {
                  const mensaje = Array.isArray(mensajes)
                    ? mensajes.join(", ")
                    : mensajes;
                  return `${campo}: ${mensaje}`;
                })
                .join(" | ")
            );
          }
          return error.message;
        },
      }),
    onSuccess: () => {
      if (queryKeyToInvalidate) {
        queryClient.invalidateQueries([queryKeyToInvalidate]); // Invalida la query correcta
      }
    },
    onError: (error) => {
      console.error(
        "Error en la mutación:",
        error.response?.data || error.message
      );
    },
    onSettled: () => {
      if (queryKeyToInvalidate) {
        queryClient.invalidateQueries([queryKeyToInvalidate]);
      }
    },
  });
};
