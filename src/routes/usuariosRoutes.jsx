import {lazy} from 'react'

const Usuarios = lazy(() => import('../data/usuarios/usuario/Usuarios'))
const EditUser = lazy(() => import('../data/usuarios/usuario/EditUser'))
const CreateUser = lazy(() => import('../data/usuarios/usuario/CreateUser'))
const Roles = lazy(() => import('../data/usuarios/rol/Roles'))
const EditRoles = lazy(() => import('../data/usuarios/rol/EditRoles'))
const CreateRoles = lazy(() => import('../data/usuarios/rol/CreateRoles'))

export const usuariosRoutes = [
    // usuarios
    { path: "/usuarios", element: <Usuarios /> },
    { path: "/editUser/:id", element: <EditUser /> },
    { path: "/createUser", element: <CreateUser /> },
    //roles
    { path: "/roles", element: <Roles /> },
    { path: "/editRol/:id", element: <EditRoles /> },
    { path: "/createRol", element: <CreateRoles /> },
]