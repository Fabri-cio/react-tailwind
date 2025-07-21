import { lazy } from "react";

const CrearInventario  = lazy(() => import("../components/inventarios/CrearInventario")) 
const RegistrarMovimiento = lazy(() => import ("../components/inventarios/RegistrarMovimiento")) 
const Inventarios = lazy(() => import ("../data/movimentos/inventario/Inventarios")) 
const Movimientos = lazy(() => import ("../data/movimentos/movimiento/Movimientos")) 

export const almacenesRoutes = [
    // movimiento 
    { path: "/movimientos", element: <Movimientos /> },
    { path: "/registrarMovimiento/:id", element: <RegistrarMovimiento /> },
    //inventario
    { path: "/inventarios", element: <Inventarios /> },
    { path: "/crear_inventario", element: <CrearInventario /> },
];