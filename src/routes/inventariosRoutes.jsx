import { lazy } from "react";

const Inventarios = lazy(() => import ("../data/inventarios/inventario/Inventarios")) 
const CrearInventario  = lazy(() => import("../data/inventarios/inventario/CreateInventario"))
const EditInventario = lazy(() => import("../data/inventarios/inventario/EditInventario")) 
const Almacenes = lazy(() => import("../data/almacenes/almacen/Almacenes")) 
const CreateAlmacen = lazy(() => import("../data/almacenes/almacen/CreateAlmacen")) 
const EditAlmacen = lazy(() => import("../data/almacenes/almacen/editAlmacen")) 
const RegistrarMovimiento = lazy(() => import ("../components/inventarios/RegistrarMovimiento")) 
const Movimientos = lazy(() => import ("../data/almacenes/movimiento/Movimientos"))
const TiposMovimientos = lazy(() => import ("../data/inventarios/tipoMovimiento/TiposMovimientos")) 
const CreateTipoMovimiento = lazy(() => import ("../data/inventarios/tipoMovimiento/CreateTipoMovimieto")) 
const EditTipoMovimiento = lazy(() => import ("../data/inventarios/tipoMovimiento/EditTipoMovimiento")) 


export const inventariosRoutes = [
    //inventario
    { path: "/inventarios", element: <Inventarios /> },
    { path: "/createInventario", element: <CrearInventario /> },
    { path: "/editInventario/:id", element: <EditInventario /> },
    //almacen
    { path: "/almacenes", element: <Almacenes /> },
    { path: "/createAlmacen", element: <CreateAlmacen /> },
    { path: "/editAlmacen/:id", element: <EditAlmacen /> },
    // movimiento 
    { path: "/movimientos", element: <Movimientos /> },
    { path: "/registrarMovimiento/:id", element: <RegistrarMovimiento /> },
    //tipo de movimiento
    { path: "/tiposMovimientos", element: <TiposMovimientos /> },
    { path: "/createTipoMovimiento", element: <CreateTipoMovimiento /> },
    { path: "/editTipoMovimiento/:id", element: <EditTipoMovimiento /> },
];