import { createApi } from "./api.config";
import { createCrudOperations } from "./api.crud";

const ApiReportes = createApi("reportes");

export const DashboardAPI = createCrudOperations(ApiReportes, "dashboard");
