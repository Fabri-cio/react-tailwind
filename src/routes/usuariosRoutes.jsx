import {lazy} from 'react'

const Usuarios = lazy(() => import('../data/usuarios/usuario/Usuarios'))
const EditUsuario = lazy(() => import('../data/usuarios/usuario/EditUsuario'))
const CreateUsuario = lazy(() => import('../data/usuarios/usuario/CreateUsuario'))
const Roles = lazy(() => import('../data/usuarios/rol/Roles'))
const EditRol = lazy(() => import('../data/usuarios/rol/EditRol'))
const CreateRol = lazy(() => import('../data/usuarios/rol/CreateRol'))

export const usuariosRoutes = [
    // usuarios
    { path: "/usuarios", element: <Usuarios /> },
    { path: "/editUsuario/:id", element: <EditUsuario /> },
    { path: "/createUsuario", element: <CreateUsuario /> },
    //roles
    { path: "/roles", element: <Roles /> },
    { path: "/editRol/:id", element: <EditRol /> },
    { path: "/createRol", element: <CreateRol /> },
]