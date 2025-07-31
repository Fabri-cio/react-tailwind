import { lazy } from "react";

const Almacenes = lazy(() => import("../data/almacenes/almacen/Almacenes")) 
const CreateAlmacen = lazy(() => import("../data/almacenes/almacen/CreateAlmacen")) 
const EditAlmacen = lazy(() => import("../data/almacenes/almacen/editAlmacen")) 
const CrearInventario  = lazy(() => import("../components/inventarios/CrearInventario")) 
const RegistrarMovimiento = lazy(() => import ("../components/inventarios/RegistrarMovimiento")) 
const Inventarios = lazy(() => import ("../data/almacenes/inventario/Inventarios")) 
const Movimientos = lazy(() => import ("../data/almacenes/movimiento/Movimientos")) 

export const almacenesRoutes = [
    //almacen
    { path: "/almacenes", element: <Almacenes /> },
    { path: "/createAlmacen", element: <CreateAlmacen /> },
    { path: "/editAlmacen/:id", element: <EditAlmacen /> },
    // movimiento 
    { path: "/movimientos", element: <Movimientos /> },
    { path: "/registrarMovimiento/:id", element: <RegistrarMovimiento /> },
    //inventario
    { path: "/inventarios", element: <Inventarios /> },
    { path: "/createInventario", element: <CrearInventario /> },
];