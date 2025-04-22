import { lazy } from "react";

const CrearInventario  = lazy(() => import("../components/inventarios/CrearInventario")) 
const RegistrarMovimiento = lazy(() => import ("../components/inventarios/RegistrarMovimiento")) 
const InventarioList = lazy(() => import ("../data/almacenes/InventarioList")) 
const Movimientos = lazy(() => import ("../data/almacenes/MovimientosList")) 

export const almacenesRoutes = [
    // movimiento 
    { path: "/ver_movimientos", element: <Movimientos /> },
    { path: "/registrarMovimiento/:id", element: <RegistrarMovimiento /> },
    //inventario
    { path: "/ver_inventario", element: <InventarioList /> },
    { path: "/crear_inventario", element: <CrearInventario /> },
];