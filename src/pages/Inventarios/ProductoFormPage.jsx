import { useform } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function ProductoFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useform();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
      toast;
    }
  });

  return <div>ProductoFormPage</div>;
}
