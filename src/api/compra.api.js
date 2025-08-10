import { createApi } from "../api/api.config";
import { createCrudOperations } from "../api/api.crud";

const ApiCompras = createApi("compras")

// Crear operaciones CRUD específicas para las ventas
export const PedidosAPI = createCrudOperations(ApiCompras, "pedidos");
export const DetallesPedidoAPI = createCrudOperations(ApiCompras, "detalles-pedido");
export const ComprasAPI = createCrudOperations(ApiCompras, "compras");
export const DetallesCompraAPI = createCrudOperations(ApiCompras, "detalles-compra");


